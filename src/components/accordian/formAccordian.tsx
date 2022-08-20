import React, {
  Fragment,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
} from 'react'
import styled from 'styled-components'
import { Button } from '../../styled/button'
import DustBinIcon from '../svgs/dustbin'
import PlusIcon from '../svgs/plus'
import WarningIcon from '../svgs/warning'

interface IFormAcc {
  children: ReactNode
  icon: ReactElement
  title: string
  show: boolean
  openIds: string | number | null
  onClick: () => void
  isError: boolean
  length: number
}

interface IFormItem {
  open: boolean
  title: string
  description: string
  handleOpen: () => void
  handleDelete: () => void
  children: ReactNode
  isError: boolean
}

interface IFormFooter {
  title: string
  onClick: () => void
}

const FormAccordian = ({
  children,
  icon,
  title,
  show,
  onClick,
  openIds,
  isError,
  length,
}: IFormAcc) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref || !ref.current) return
    const items = ref.current.querySelectorAll('.item')

    if (!items) return

    let activeItem: HTMLElement | null = null

    items.forEach((item) => {
      const itemBody = item.children[1] as HTMLElement
      if (!itemBody) return
      itemBody.style.height = '0px'
      if (item.classList.contains('active')) {
        activeItem = itemBody
        itemBody.style.height = itemBody.scrollHeight + 'px'
      } else {
        itemBody.style.height = '0px'
        itemBody.style.overflow = 'hidden'
      }
    })

    const timer = setTimeout(() => {
      if (!activeItem) return
      activeItem.style.overflow = 'visible'
    }, 500)

    return () => clearTimeout(timer)
  }, [ref.current, openIds, length])

  return (
    <Fragment>
      <Wrapper ref={ref} data-test-id={`acc_${title.toLowerCase()}`}>
        <HeaderWrapper className="header">
          <Heading>
            {icon}
            <p>{title}</p>
          </Heading>
          <ToggleWrapper>
            {isError && (
              <IconWrapper style={{ marginRight: '1rem' }}>
                <WarningIcon size="1.5rem" color="rgba(244, 67, 54, 0.8)" />
              </IconWrapper>
            )}
            <Toggle active={show} onClick={onClick} data-test-id="acc_toggle">
              <PlusIcon size="1.2rem" />
            </Toggle>
          </ToggleWrapper>
        </HeaderWrapper>
        {show && children}
      </Wrapper>
    </Fragment>
  )
}

const Item: React.FC<IFormItem> = ({
  open,
  title,
  description,
  handleOpen,
  handleDelete,
  children,
  isError,
}) => {
  return (
    <FormWrapper
      className={`item ${open ? 'active' : 'inactive'} ${
        isError ? 'error' : ''
      }`}
      data-test-id="acc_item"
    >
      <FormHeader>
        <div
          style={{ cursor: 'pointer', userSelect: 'none' }}
          onClick={handleOpen}
        >
          {!open && (
            <Fragment>
              <p style={{ fontSize: '16px', marginBottom: '0.5rem' }}>
                {title}
              </p>
              <p style={{ color: '#A8A8A8' }}>{description}</p>
            </Fragment>
          )}
        </div>
        <ToggleDelete onClick={handleDelete} data-test-id="acc_item_delete">
          <DustBinIcon size="1.1rem" />
        </ToggleDelete>
      </FormHeader>
      <FormItemBody> {children}</FormItemBody>
    </FormWrapper>
  )
}

const Footer: React.FC<IFormFooter> = ({ title, onClick }) => {
  return (
    <Fragment>
      <AccFooter className="item">
        <Button
          type="button"
          btnType="link"
          data-test-id="acc_add"
          onClick={onClick}
        >
          <PlusIcon /> {title}
        </Button>
      </AccFooter>
    </Fragment>
  )
}

FormAccordian.Item = Item
FormAccordian.Footer = Footer

export default FormAccordian

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 0.7rem;
  padding-left: 0.7rem;
  width: 100%;
  background: #ffffff;
  box-shadow: 4px 1px 8px rgba(0, 50, 61, 0.08);
  border: 1px solid #f5f5f5;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  transition: all ease-in-out;
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 90% 10%;
  min-height: 65px;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  user-select: none;
  width: 100%;
`

const Toggle = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    transition: transform 300ms;
    transform: ${({ active }) => (active ? `rotateZ(45deg)` : `rotateZ(0deg)`)};
  }

  &:hover {
    svg {
      path {
        stroke: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`
const Heading = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  p {
    font-size: 1.125rem;
    margin-left: 1.5rem;
  }
  svg {
    margin-bottom: 0.4rem;
  }
`
const FormWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  border: 1px solid #f2f5fa;
  border-radius: 6px;
  padding: 0.8rem;
  margin-bottom: 1rem;
  width: 100%;
  &.error {
    border-color: rgba(244, 67, 54, 0.6);
    background: rgb(244 67 54 / 1%);
  }
`
const FormHeader = styled.div`
  display: grid;
  grid-template-columns: 95% 5%;
  width: 100%;
  div {
    p {
      margin-top: 0;
      margin-bottom: 0.2rem;
    }
  }
`
const ToggleDelete = styled.div`
  display: block;
  cursor: pointer;
  text-align: center;
  &:hover {
    svg {
      path {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`
const AccFooter = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1rem;
  ${Button} {
    width: fit-content;
    svg {
      margin-right: 0.7rem;
      path {
        stroke: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`
const FormItemBody = styled.div`
  display: block;
  transition: height 0.3s;
  height: 0px;
  overflow: hidden;

  .invalid-feild {
    height: 0;
    position: relative;
    top: 5px;
  }
`
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin: 0;
  }
`
