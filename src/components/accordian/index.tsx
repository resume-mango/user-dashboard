import React, {
  Fragment,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react'
import styled from 'styled-components'
import detectOutsideClick from '../../hooks/detectOutsideClick'
import { Button } from '../../styled/button'
import DustBinIcon from '../svgs/dustbin'
import PlusIcon from '../svgs/plus'

interface IProps {
  children: ReactNode
}

interface IBProps {
  show?: boolean
  children: ReactNode
}

const Accordian = ({ children }: IProps) => {
  // const [show, setShow] = useState(false)

  // const handleClick = (e) => {
  //   setShow(!show)
  // }

  // useEffect(() => {
  //   if (ref.current && ref.current.children.length > 0) {
  //     ref.current.children[1].style.height = show
  //       ? ref.current.children[1].scrollHeight + 'px'
  //       : '0px'
  //   }
  // }, [ref, show])

  // const childrenWithProps = React.Children.map(children, (child) =>
  //   React.cloneElement(child as ReactElement, { show, handleClick })
  // )

  return (
    <Fragment>
      <Wrapper>{children}</Wrapper>
    </Fragment>
  )
}

const Header = ({ show, onClick, children }) => {
  return (
    <HeaderWrapper>
      <div>{children}</div>
      <Toggle active={show} onClick={onClick}>
        <PlusIcon size='1.4rem' />
      </Toggle>
    </HeaderWrapper>
  )
}

const Body = (props) => {
  const {
    id,
    open,
    setOpen,
    handleOpen,
    title,
    description,
    handleDelete,
    children
  } = props

  return (
    <Fragment>
      <FormWrapper id={id}>
        <FormHeader>
          <div
            style={{ cursor: 'pointer', userSelect: 'none' }}
            onClick={handleOpen}
          >
            <p style={{ fontSize: '16px' }}>{title}</p>
            <p style={{ color: '#A8A8A8' }}>{description}</p>
          </div>
          <ToggleDelete onClick={handleDelete}>
            <DustBinIcon size='1.1rem' />
          </ToggleDelete>
        </FormHeader>
        {open && children}
      </FormWrapper>
    </Fragment>
  )
}

const Footer = ({ show, title, onClick }) => {
  return (
    <Fragment>
      {show && (
        <AccFooter>
          <Button type='button' btnType='link' onClick={onClick}>
            <PlusIcon /> {title}
          </Button>
        </AccFooter>
      )}
    </Fragment>
  )
}

Accordian.Header = Header
Accordian.Body = Body
Accordian.Footer = Footer

export default Accordian

const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 95% 5%;
  min-height: 65px;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  cursor: pointer;
  user-select: none;
  width: 100%;
`

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
`

const Toggle = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transition: transform 300ms;
    transform: ${({ active }) => (active ? `rotateZ(45deg)` : `rotateZ(0deg)`)};
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
