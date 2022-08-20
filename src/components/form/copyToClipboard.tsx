import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const CopyToClipboard = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false)
  const handleClick = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
  }

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => {
      setCopied(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [copied])

  return (
    <Wrapper>
      <p>{value}</p>
      <span onClick={handleClick}>
        <span className="hover-copy">
          {copied ? 'Copied' : 'Copy to clipboard'}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M336 64h-53.88C268.9 26.8 233.7 0 192 0S115.1 26.8 101.9 64H48C21.5 64 0 85.48 0 112v352C0 490.5 21.5 512 48 512h288c26.5 0 48-21.48 48-48v-352C384 85.48 362.5 64 336 64zM192 64c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S160 113.7 160 96C160 78.33 174.3 64 192 64zM272 224h-160C103.2 224 96 216.8 96 208C96 199.2 103.2 192 112 192h160C280.8 192 288 199.2 288 208S280.8 224 272 224z" />
        </svg>
      </span>
    </Wrapper>
  )
}

export default CopyToClipboard

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  p {
    margin: 0 1rem 0 0;
    font-size: 0.875rem;
  }
  span {
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    svg {
      width: 15px;
      height: 15px;
      path {
        fill: #888;
      }
    }
    position: relative;
    width: 120px;
    .hover-copy {
      display: block;
      background-color: #343434;
      color: #fff;
      font-size: 0.75rem;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      position: absolute;
      top: -5px;
      max-width: 120px;
      min-width: 75px;
      width: fit-content;
      left: 20px;
      visibility: hidden;
      opacity: 0;
      transition: ease 0.2s;
    }
    &:hover {
      .hover-copy {
        visibility: visible;
        opacity: 1;
      }
      svg path {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`
