const templateMapper = (
  initialJson: any,
  initialData: any,
  templateWrapper: HTMLElement,
  buffer: number
) => {
  if (
    !initialJson ||
    !initialJson.layout ||
    !initialJson.secondaryLayout ||
    !initialData
  )
    return

  const json2html = (json: any) => {
    const node = (item: any) => {
      const e = document.createElement(item.tag)
      if (item.class) e.className = item.class
      if (item.name && item.name !== 'element') e.classList.add(item.name)
      if (item.id) e.classList.add(item.id)
      if (item.text) {
        if (e.classList.contains('space_before')) {
          e.textContent = '\u0020' + item.text
        } else {
          e.textContent = item.text
        }
      }
      if (item.html) e.innerHTML = item.html
      if (item.src) e.src = item.src
      if (item.blocks && item.blocks.length > 0) {
        e.classList.add('template_column', 'not-filled')
        e.setAttribute('data-blocks', item.blocks.join(' '))
      }

      if (item.children && item.children.length > 0) {
        for (const child of item.children) e.appendChild(node(child))
      }
      return e
    }

    return node(json)
  }

  const deepKeys: any = (t: any, pre = []) =>
    Array.isArray(t)
      ? []
      : Object(t) === t
      ? Object.entries(t).flatMap(([k, v]) => deepKeys(v, [...pre, k]))
      : pre.join('.')

  const getKeyVal = (selectionArray: Array<any>, obj: any) => {
    selectionArray.forEach((key) => {
      obj = obj[key]
    })
    return obj
  }

  const chunkArray = (arr: Array<any>, n: number) => {
    const chunkLength = Math.max(arr.length / n, 1)
    const chunks = []
    for (let i = 0; i < chunkLength; i++) {
      chunks.push(arr.slice(n * i, n * (i + 1)))
    }
    return chunks
  }

  const mapKeys = (block: any, keys: any, data: any) => {
    const i = keys.indexOf(block.name)
    if (i >= 0) {
      const key = keys[i].split('.')
      const val = getKeyVal(key, data)

      if (key.length === 1 && key[0] === 'description') {
        block.html = val
      } else {
        block.text = val
      }
    }
    if (block.parent) {
      const kIndex = keys.indexOf(block.parent)
      if (kIndex >= 0) {
        const key = block.parent.split('.')
        const val = getKeyVal(key, data)
        if (!val) {
          if (block.text) block.text = ''
          if (block.html) block.html = ''
        }
      } else {
        if (block.text) block.text = ''
        if (block.html) block.html = ''
      }
    }

    if (block.children.length > 0) {
      for (const child of block.children) mapKeys(child, keys, data)
    }
    return block
  }

  const mapLayoutWrapper = (title: string, layout: any) => {
    let columns = 0
    const mapper = (title: string, layout: any) => {
      if (layout.name === 'title') {
        layout.text = title
      }
      if (layout.name === 'blocks-wrapper' && layout.columns) {
        columns = parseInt(layout.columns)
      }
      for (const child of layout.children) mapper(title, child)
    }
    mapper(title, layout)

    return { layout, columns }
  }

  const pages: any = {}

  const current: any = {
    page: null,
    pageNo: 1,
    wrapper: null,
    column: null,
    blocksWrapper: null,
    block: null
  }
  const secondaryLayout = json2html(initialJson.secondaryLayout)

  const mapDesc = (
    title: string,
    block: any,
    parent: any,
    initialPageOffset: number,
    blockIndex: number,
    hasColumns: boolean,
    clonedBlockLayout: any,
    pageLayout: any
  ) => {
    const blockRect = block.getBoundingClientRect()
    const blockOffset = blockRect.y + window.scrollY + blockRect.height + buffer
    if (blockOffset > initialPageOffset) {
      const childBlocks = Array.from(block.children)
      block.innerHTML = ''
      let wrapper = parent.querySelector('.description')

      if (childBlocks.length === 0) return

      childBlocks.forEach((el: any, i: number) => {
        if (wrapper) wrapper.appendChild(el)

        const elRect = el.getBoundingClientRect()
        const elOffset = elRect.y + window.scrollY + elRect.height + buffer
        const pageRect = current.page.getBoundingClientRect()
        const pageOffset = pageRect.y + window.scrollY + pageRect.height

        if (elOffset > pageOffset) {
          let newBlock

          if (i > 0) {
            const mapped = mapKeys(clonedBlockLayout, [], {})
            newBlock = json2html(mapped)
            const newDescBlock = newBlock.querySelector('.description')

            if (newDescBlock) {
              newDescBlock.appendChild(el)
              wrapper = newDescBlock
            }
          } else {
            newBlock = parent
          }
          let page: any
          if (current.pageNo >= Object.keys(pages).length) {
            page = secondaryLayout.cloneNode(true)
            pages[current.pageNo + 1] = {
              page,
              cols: [...page.querySelectorAll('.template_column')]
            }
            templateWrapper.appendChild(page)
          } else {
            page = pages[current.pageNo + 1].page
          }

          current.pageNo = current.pageNo + 1

          const subMapperLayout = mapLayoutWrapper(title, pageLayout)
          if (blockIndex < 1 && i < 1) current.wrapper.remove()

          current.wrapper = json2html(subMapperLayout.layout)

          const secCol = [...page.querySelectorAll('.template_column')]

          const found = secCol.filter(
            (col) =>
              col.getAttribute('data-blocks') ===
              current.column.getAttribute('data-blocks')
          )[0]

          current.page = page
          current.column = found
          current.blocksWrapper =
            current.wrapper.getElementsByClassName('blocks-wrapper')[0]

          if (hasColumns) {
            current.blocksWrapper.removeAttribute('class')
          }

          current.blocksWrapper.appendChild(newBlock)
          current.column.appendChild(current.wrapper)
          current.column.classList.remove('not-filled')
          if (blockIndex >= 1 || i >= 1) {
            const heading = current.wrapper.getElementsByClassName('title')[0]
            heading.parentElement.removeChild(heading)
          }
        }
      })
    }
    return
  }

  const overflown = (
    title: string,
    layout: any,
    block: any,
    blockIndex: number,
    hasColumns: boolean,
    clonedBlockLayout: any
  ) => {
    const pageRect = current.page.getBoundingClientRect()
    const pageOffset = pageRect.y + window.scrollY + pageRect.height

    const blockRect = block.getBoundingClientRect()
    const blockOffset = blockRect.y + window.scrollY + blockRect.height + buffer
    if (blockOffset > pageOffset) {
      let page: any
      // ////////////////// //New
      const descEl = block.querySelector('.description')
      if (descEl) {
        mapDesc(
          title,
          descEl,
          block,
          pageOffset,
          blockIndex,
          hasColumns,
          clonedBlockLayout,
          layout
        )
      } else {
        if (current.pageNo >= Object.keys(pages).length) {
          page = secondaryLayout.cloneNode(true)
          pages[current.pageNo + 1] = {
            page,
            cols: [...page.querySelectorAll('.template_column')]
          }
          templateWrapper.appendChild(page)
        } else {
          page = pages[current.pageNo + 1].page
        }

        current.pageNo = current.pageNo + 1

        const subMapperLayout = mapLayoutWrapper(title, layout)
        if (blockIndex < 1) current.wrapper.remove()

        current.wrapper = json2html(subMapperLayout.layout)

        const secCol = [...page.querySelectorAll('.template_column')]

        const found = secCol.filter(
          (col) =>
            col.getAttribute('data-blocks') ===
            current.column.getAttribute('data-blocks')
        )[0]
        current.page = page
        current.column = found
        current.blocksWrapper =
          current.wrapper.getElementsByClassName('blocks-wrapper')[0]

        if (hasColumns) {
          current.blocksWrapper.removeAttribute('class')
        }
        current.blocksWrapper.appendChild(block)
        current.column.appendChild(current.wrapper)
        current.column.classList.remove('not-filled')

        if (blockIndex >= 1) {
          const heading = current.wrapper.getElementsByClassName('title')[0]
          heading.parentElement.removeChild(heading)
        }
      }
    }
  }

  const mapBlockLayout = (
    title: string,
    layout: any,
    blocks: any,
    clonedBlockLayout: any
  ) => {
    if (blocks.length < 1) return

    const mappedWrapper = mapLayoutWrapper(title, layout)
    current.wrapper = json2html(mappedWrapper.layout)

    current.column.appendChild(current.wrapper)

    current.blocksWrapper =
      current.wrapper.getElementsByClassName('blocks-wrapper')[0]

    if (mappedWrapper.columns > 0) {
      const chunks = chunkArray(blocks, mappedWrapper.columns)
      const className = current.blocksWrapper.classList.toString()
      current.blocksWrapper.removeAttribute('class')
      chunks.map((chunk, i) => {
        const obj = {
          tag: current.blocksWrapper.tagName.toLowerCase(),
          class: className,
          children: chunk
        }
        current.block = json2html(obj)
        current.blocksWrapper.appendChild(current.block)
        overflown(title, layout, current.block, i, true, clonedBlockLayout)
      })
    } else {
      blocks.map((block: any, i: number) => {
        current.block = json2html(block)
        current.blocksWrapper.appendChild(current.block)
        overflown(title, layout, current.block, i, false, clonedBlockLayout)
      })
    }
  }

  const mapMultiBlock = (json: any, data: any) => {
    if (Array.isArray(data) && data.length > 0) {
      const mapped = data.map((item) => {
        const block = JSON.parse(JSON.stringify(json.block))
        const keys = deepKeys(item)
        return mapKeys(block, keys, item)
      })
      mapBlockLayout(
        json.title,
        json.layout,
        mapped,
        JSON.parse(JSON.stringify(json.block))
      )
    }
  }
  const mapSingleBlock = (
    json: any,
    title: string,
    data: any,
    col: HTMLElement
  ) => {
    const blockName = 'blocks-wrapper'
    const foundKeys = []
    const mapper = (json: any, title: string, data: any) => {
      if (json.name !== 'element') {
        if (json.name === 'title') {
          json.text = title
        } else {
          if (data[json.name]) {
            foundKeys.push(json.name)
            if (json.name === 'about_info' || json.name === 'description') {
              json.html = data[json.name]
            } else {
              json.text = data[json.name]
            }
          }
        }
      }
      if (json.parent && !data[json.parent]) {
        if (json.tag === 'img') {
          json.tag = 'span'
          json.src = ''
        }
        if (json.text) json.text = ''
        if (json.html) json.html = ''
      }
      for (const child of json.children) mapper(child, title, data)
      return json
    }

    const mapped = mapper(json, title, data)
    if (mapped) {
      if (foundKeys.length === 0) return
      current.column = col
      current.block = json2html(mapped)

      current.column.appendChild(current.block)
      current.column.classList.remove('not-filled')

      current.blocksWrapper = current.block.querySelector('.' + blockName)
      if (!current.blocksWrapper) return
      const childBlocks = Array.from(current.blocksWrapper.children).splice(
        0,
        current.blocksWrapper.children.length
      )
      current.blocksWrapper.innerHTML = ''
      childBlocks.forEach((block: any, i: number) => {
        current.blocksWrapper.appendChild(block)

        const pageRect = current.page.getBoundingClientRect()
        const pageOffset = pageRect.y + window.scrollY + pageRect.height

        const blockRect = block.getBoundingClientRect()
        const offsetVals = blockRect.y + window.scrollY + buffer
        const blockOffset = blockRect.height + offsetVals
        if (blockOffset >= pageOffset) {
          let page: any
          if (current.pageNo >= Object.keys(pages).length) {
            page = secondaryLayout.cloneNode(true)
            pages[current.pageNo + 1] = {
              page,
              cols: [...page.querySelectorAll('.template_column')]
            }
            templateWrapper.appendChild(page)
          } else {
            page = pages[current.pageNo + 1].page
          }
          current.page = page
          current.pageNo = current.pageNo + 1
          current.wrapper = current.block.cloneNode(true)
          current.page.appendChild(current.wrapper)
          current.blocksWrapper = current.wrapper.querySelector('.' + blockName)
          current.blocksWrapper.innerHTML = ''
          current.blocksWrapper.appendChild(block)
          const secCol = [...page.querySelectorAll('.template_column')]
          const found = secCol.filter(
            (col) =>
              col.getAttribute('data-blocks') ===
              current.column.getAttribute('data-blocks')
          )[0]
          current.column = found
          current.column.appendChild(current.wrapper)
          current.column.classList.remove('not-filled')
          if (i >= 1) {
            const heading = current.wrapper.getElementsByClassName('title')[0]
            heading && heading.parentElement.removeChild(heading)
          }
        }
      })
    }
  }

  const mapBlocks = (
    blocks: any,
    data: any,
    columns: any,
    page: HTMLElement
  ) => {
    pages['1'] = { page, cols: columns }
    columns.length > 0 &&
      columns.forEach((col: any) => {
        current.page = pages['1'].page
        current.pageNo = 1
        current.column = col
        const attr = col.getAttribute('data-blocks').split(' ')
        attr.forEach((key: string) => {
          if (!blocks[key]) return
          if (blocks[key].multiple) {
            mapMultiBlock(blocks[key], data[key])
          } else {
            mapSingleBlock(blocks[key].layout, blocks[key].title, data, col)
          }
        })
      })
  }

  const mapLayout = (layout: any, data: any) => {
    const mapper = (layout: any, data: any) => {
      const keys = deepKeys(data)
      keys.forEach((k: string) => {
        const key = k.split('.')
        const val = getKeyVal(key, data)
        if (typeof val === 'string' && layout.name === k) {
          if (k === 'avatar.processed') {
            layout.src = val
          } else {
            layout.text = val
          }
        }
        if (layout.parent && !data[layout.parent]) {
          if (layout.tag === 'img') {
            layout.tag = 'span'
            layout.src = ''
          }
          if (layout.text) layout.text = ''
          if (layout.html) layout.html = ''
        }
      })
      for (const child of layout.children) mapper(child, data)
    }
    mapper(layout, data)

    return layout
  }

  const layout = mapLayout(initialJson.layout, initialData)
  const createLayout = json2html(layout)
  const newPage = templateWrapper.appendChild(createLayout)
  const columns = [...newPage.querySelectorAll('.template_column')]

  initialJson.blocks &&
    mapBlocks(initialJson.blocks, initialData, columns, newPage)

  const empty: Array<any> = []
  Object.keys(pages).forEach((key) => {
    empty.push(...pages[key].page.querySelectorAll('.removable-blocks'))

    if (empty.length > 0) {
      empty.forEach((el) => {
        const blocks = el.querySelectorAll('.block')
        if (blocks.length === 0) el.remove()
        return
      })
    }
  })

  return pages
}

export default templateMapper
