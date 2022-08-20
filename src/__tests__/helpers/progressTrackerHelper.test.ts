import * as ptHelper from '../../helpers/progressTrackerHelpers'

describe('Progress Tracker Helper', () => {
  test('removes item from progress tracker list from given position', () => {
    const list = [1, 2, 3, 4, 5]
    const index = 2

    const result = ptHelper.removeFromList(list, index)

    expect(result).toEqual([3, [1, 2, 4, 5]])
  })

  test('adds item to progress tracker list at given postion', () => {
    const list = [1, 2, 3, 4, 5]
    const index = 2
    const element = 12
    const result = ptHelper.addToList(list, index, element)

    expect(result).toEqual([1, 2, 12, 3, 4, 5])
  })

  test('Handles drag start on progress tracker', () => {
    const event = {
      type: 'type_id',
      draggabelId: 'draggabel_id',
      source: {
        droppableId: 'droppable_id',
        index: 1,
      },
    } as any
    const parent = document.createElement('div')
    parent.style.paddingTop = '10px'
    const element = document.createElement('div') as any
    const draggedDOM = jest.fn().mockReturnValue(element)
    parent.appendChild(element)
    const result = ptHelper.progressTrackerHandleDragStart(event, draggedDOM)
    expect(result).toEqual({
      clientHeight: 0,
      clientWidth: 0,
      clientY: NaN,
      draggedDOM: element,
    })
  })

  test('Handles drag update on progress tracker', () => {
    const event = {
      type: 'type_id',
      draggabelId: 'draggabel_id',
      destination: {
        droppableId: 'destination_droppable_id',
      },
      source: {
        droppableId: 'source_droppable_id',
        index: 1,
      },
    } as any
    const createELem = () => document.createElement('div')
    const parent = createELem()
    parent.id = 'drag-container'
    parent.style.paddingTop = '10px'
    const element = createELem()
    element.id = `drag-column-${event.destination.droppableId}`
    const element1 = createELem()
    const subelement1 = createELem()
    const subelement2 = createELem()
    element.appendChild(subelement1)
    element.appendChild(subelement2)

    const draggedDOM = jest.fn().mockReturnValue(element)
    parent.appendChild(element)
    parent.appendChild(element1)

    document.body.appendChild(parent)
    const result = ptHelper.progressTrackerHandleDragUpdate(event, draggedDOM)
    expect(result).toEqual({
      clientHeight: 0,
      clientWidth: 0,
      clientY: NaN,
      draggedDOM: element,
    })
  })

  test('Handles drag end on progress tracker', () => {
    const IncompleteDropResult = {
      type: 'type_id',
      draggabelId: 'draggabel_id',
    } as any

    const result2 = ptHelper.progressTrackerHandleDragEnd(
      {
        source_droppable_id: 'source_droppable_id',
        destination_droppable_id: 'destination_droppable_id',
      },
      IncompleteDropResult
    )
    expect(result2).toBeUndefined()

    jest.spyOn(ptHelper, 'removeFromList').mockReturnValue([1, [2, 3, 4]])

    const mockedAdd = jest
      .spyOn(ptHelper, 'addToList')
      .mockReturnValue([2, 3, 4])

    const DropResult = {
      type: 'type_id',
      draggabelId: 'draggabel_id',
      destination: {
        droppableId: 'destination_droppable_id',
        index: 1,
      },
      source: {
        droppableId: 'source_droppable_id',
        index: 1,
      },
    } as any

    ptHelper.progressTrackerHandleDragEnd(
      {
        source_droppable_id: 'source_droppable_id',
        destination_droppable_id: 'destination_droppable_id',
      },
      DropResult
    )
    expect(mockedAdd).toBeCalledWith('destination_droppable_id', 1, 1)
  })
})
