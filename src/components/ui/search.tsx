import React from 'react'
import styled from 'styled-components'
import BackArrow from '../svgs/backArrow'
import SearchIcon from '../svgs/searchIcon'

interface IProps {
  placeholder?: string
  value: string
  setValue: (_val: string) => void
  handleSubmit: () => void
  style?: React.CSSProperties
}

const Search: React.FC<IProps> = ({
  placeholder,
  value,
  setValue,
  handleSubmit,
  style,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = e.target as HTMLElement
      input.blur()
      handleSubmit()
    }
  }

  return (
    <SearchWrapper style={style}>
      <span className="icon">
        <SearchIcon />
      </span>
      <input
        name="search"
        type="text"
        placeholder={placeholder ? placeholder : 'Search'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
        autoComplete="off"
      />
      <span className="search-btn icon" onClick={handleSubmit}>
        <BackArrow size="1.1rem" />
      </span>
    </SearchWrapper>
  )
}

export default Search

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 4px;
  input {
    background-color: transparent;
    border: none;
    height: 40px;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
  .icon {
    display: flex;
    height: 100%;
    width: 50px;
    align-items: center;
    justify-content: center;
  }
  .search-btn {
    transform: rotateY(180deg);
    cursor: pointer;
    &:hover {
      svg {
        path {
          fill: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }
`
