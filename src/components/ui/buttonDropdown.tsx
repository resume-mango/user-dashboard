import React, { Fragment, ReactNode, useState } from 'react'
import styled from 'styled-components'
import { Button } from '../../styled/button'
import DownArrowIcon from '../svgs/downArrow'
import VerticalLineIcon from '../svgs/verticalLine'

interface IProps {
  children: ReactNode
  name: string
  show: boolean
  backgroundColor?: string
  setShow: (val: boolean) => void
  color?: string
}

const ButtonDropdown = ({
  children,
  name,
  show,
  setShow,
  color,
  backgroundColor,
  ...rest
}: IProps) => {
  const handleClick = (e) => {
    e.preventDefault()
    setShow(!show)
  }

  return (
    <Fragment>
      <DropdownWrapper>
        {show && <Dropdown>{children}</Dropdown>}
        <Button
          style={{
            margin: '0',
            backgroundColor: backgroundColor || '',
            color: color || ''
          }}
          onClick={(e) => handleClick(e)}
          {...rest}
        >
          {name}

          <VerticalLineIcon color={color || ''} size='1.5rem' />
          <DownArrowIcon color={color || ''} />
        </Button>
      </DropdownWrapper>
    </Fragment>
  )
}

const Item = ({ children }: { children: ReactNode }) => {
  return <DropdownItem>{children}</DropdownItem>
}

ButtonDropdown.Item = Item

export default ButtonDropdown

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  max-width: fit-content;
  ${Button} {
    justify-content: space-around;
    padding: 0 1rem;
    img {
      transform: rotateX(180deg);
      display: flex;
    }
  }
`

const Dropdown = styled.ul`
  background: #ffffff;
  border: 1px solid rgba(2, 52, 126, 0.12);
  box-shadow: -2px 4px 7px rgba(0, 50, 97, 0.08);
  border-radius: 4px;
  padding: 0.5rem 0;
  margin: 0.3rem 0;
  display: inline-flex;
  flex-direction: column;
  position: absolute;
  bottom: 3rem;
  width: 100%;
`
const DropdownItem = styled.li`
  a {
    width: 100%;
    display: block;
    font-size: ${({ theme }) => theme.fonts.small};
    padding: 0.3rem 0.7rem;
    transition: all 300ms ease-in-out;
    &:hover {
      background-color: ${({ theme }) => theme.colors.light};
    }
  }
`
