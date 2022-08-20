import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import detectOutsideClick from '../../hooks/detectOutsideClick'
import SearchIcon from '../svgs/searchIcon'

interface IProps {
  data: Array<any>
  handleClick: (text: string) => void
}

const SearchDropdown: React.FC<IProps> = ({ data, handleClick }) => {
  const [show, setShow] = useState(false)
  const [value, setValue] = useState('')
  const [found, setFound] = useState<string[]>([])
  const { isOutside, ref } = detectOutsideClick()

  useEffect(() => {
    if (!isOutside) return
    setShow(false)
  }, [isOutside])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (data && ((found.length < 0 && data.length > 1) || value.length < 1)) {
        const initialItems = data.filter((item, i) => i < 10)
        setFound(initialItems)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [data, value])

  useEffect(() => {
    if (!value || value.length < 1) return
    const timer = setTimeout(() => {
      const find = data.filter((item) =>
        item.text.toLowerCase().includes(value.toLowerCase())
      )
      if (find.length > 0) {
        setFound(find)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [value])

  const handle = (text: string) => {
    handleClick(text)
  }

  return (
    <Fragment>
      <Wrapper ref={ref}>
        <Button type='button' onClick={() => setShow(!show)}>
          Choose Description <span>{data.length}</span>
        </Button>
        <DropdownWrapper show={show}>
          <SearchWrapper>
            <SearchIcon />
            <input
              type='text'
              placeholder='Search keywords'
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </SearchWrapper>
          <ListWrapper>
            {found.map((item: any, i) => (
              <li key={i} onClick={() => handle(item.text)}>
                {item.text}
              </li>
            ))}
          </ListWrapper>
        </DropdownWrapper>
      </Wrapper>
    </Fragment>
  )
}

export default SearchDropdown

const Wrapper = styled.div`
  display: block;
  position: relative;
`
const Button = styled.button`
  color: #f08438;
  background-color: #f4f5f7;
  border-radius: 4px;
  height: 32px;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 0.875rem;
  position: relative;
  span {
    content: '';
    width: 18px;
    height: 18px;
    background-color: #f08438;
    color: #fff;
    font-size: 0.625rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -5px;
    right: -5px;
  }
`
const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 1rem;
  padding-left: 1rem;
  border-bottom: 1px solid #e2e9f3;
  input {
    background-color: #fff;
    border: none;
  }
`
const DropdownWrapper = styled.div<{ show: boolean }>`
  width: 400px;
  background-color: #fff;
  box-shadow: 4px 4px 19px rgb(0 18 81 / 6%);
  border-radius: 5px;
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 10;
  margin-top: 0.5rem;
  border: 1px solid #f4f5f7;
  transition: transform ease-in-out 200ms, opacity 300ms, visibility 300ms;
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  opacity: ${({ show }) => (show ? 1 : 0)};
  transform: ${({ show }) => (show ? 'scale(1)' : 'scale(0)')};
  transform-origin: 100% 0;
`
const ListWrapper = styled.ul`
  margin: 0.2rem;
  max-height: 400px;
  overflow-y: auto;
  li {
    padding: 0.5rem;
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    transition: background-color 0.5s ease-in-out;
    &:before {
      content: '\u2022';
      font-size: 1.5rem;
      line-height: 0.8;
      margin-right: 0.5rem;
      color: rgba(135, 135, 135, 1);
    }
    &:hover {
      background-color: #f4f5f7;
    }
  }
`
