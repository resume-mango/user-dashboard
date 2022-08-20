import React, { Fragment, ReactNode, useEffect, useRef } from 'react'
import styled from 'styled-components'

interface IDropdownButton {
  vertical: 'top' | 'bottom'
  horizontal: 'left' | 'right'
  btnStyle?: React.CSSProperties | undefined
  children: ReactNode
  show: boolean
  setShow: (val: boolean) => void
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any
  className?: string
  disabled?: boolean
}

const DropButton = ({
  vertical,
  horizontal,
  btnStyle,
  children,
  show,
  setShow,
  onClick,
  className,
  disabled,
}: IDropdownButton) => {
  const ref = useRef<HTMLDivElement>(null)

  const handleClickOutside = (e: any) => {
    if (ref && ref.current && !ref.current.contains(e.target)) {
      setShow(false)
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setShow(!show)
    if (!onClick) return
    onClick(e)
  }

  useEffect(() => {
    if (!ref) return
    document.addEventListener('mousedown', handleClickOutside, true)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true)
    }
  })

  const horizontalCss = horizontal === 'left' ? { right: 0 } : { left: 0 }
  const verticalCss = vertical === 'top' ? { bottom: '100%' } : { top: '100%' }

  const items = React.Children.map(children, (child: any) => {
    if (child.type && child.type === Item) {
      return child
    }
  })
  return (
    <Fragment>
      <Wrapper ref={ref} className={className} data-test-id="dropdown-wrapper">
        {show && (
          <Popper style={{ ...horizontalCss, ...verticalCss }}>{items}</Popper>
        )}
        {React.Children.map(children, (child: any) => {
          if (child.type === Button) {
            return (
              <StyledButton
                disabled={disabled}
                style={{ ...btnStyle }}
                onClick={(e) => handleClick(e)}
              >
                {child}
              </StyledButton>
            )
          }
        })}
      </Wrapper>
    </Fragment>
  )
}

const Button = ({ children }: { children: ReactNode }) => {
  return <Fragment>{children}</Fragment>
}

const Item = ({ children }: { children: ReactNode }) => {
  return <StyledItem>{children}</StyledItem>
}

DropButton.Button = Button
DropButton.Item = Item

export default DropButton

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  height: auto;
  padding: 0.3rem;
  width: 100%;
  user-select: none;
  * {
    pointer-events: none;
  }
`
const Wrapper = styled.div`
  display: block;
  position: relative;
  width: fit-content;
  user-select: none;
`
const Popper = styled.ul`
  background: #ffffff;
  border: 1px solid rgba(2, 52, 126, 0.12);
  box-shadow: -2px 4px 7px rgba(0, 50, 97, 0.08);
  border-radius: 4px;
  padding: 0.5rem 0;
  margin: 0.3rem 0;
  display: inline-flex;
  flex-direction: column;
  position: absolute;
  z-index: 10;
  width: 100%;
  min-width: 75px;
  cursor: default;
`

const StyledItem = styled.li`
  width: 100%;
  padding: 0;
  margin: 0;
  a {
    display: block;
    font-size: ${({ theme }) => theme.fonts.small};
    padding: 0.3rem 0.5rem;
    transition: all 300ms ease-in-out;
    &:hover {
      background-color: ${({ theme }) => theme.colors.light};
    }
  }
  @media (max-width: 1300px) {
    a {
      font-size: 0.8rem;
    }
  }
`
