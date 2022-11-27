import React, { Fragment, ReactElement, ReactNode } from 'react'
import styled from 'styled-components'

import PlusIcon from '../svgs/plus'

interface IProps {
  children: ReactNode
  icon: ReactElement
  title: string
  show: boolean
  onClick: () => void
}

const BasicAccordian = ({ children, icon, title, show, onClick }: IProps) => {
  return (
    <Fragment>
      <Wrapper data-test-id={`acc_${title.replace(/\s+/g, '_').toLowerCase()}`}>
        <HeaderWrapper className="header" onClick={onClick}>
          <Heading>
            {icon}
            <p>{title}</p>
          </Heading>
          <ToggleWrapper>
            <Toggle active={show} data-test-id="acc_toggle">
              <PlusIcon size="1.2rem" />
            </Toggle>
          </ToggleWrapper>
        </HeaderWrapper>
        <BodyWrapper show={show} data-test-id="acc_body">
          {children}
        </BodyWrapper>
      </Wrapper>
    </Fragment>
  )
}

export default BasicAccordian

const Toggle = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transition: transform 300ms;
    transform: ${({ active }) => (active ? `rotateZ(45deg)` : `rotateZ(0deg)`)};
  }
`
const Heading = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  p {
    font-size: 1rem;
    margin-left: 1rem;
    font-weight: 600;
  }
`

const Wrapper = styled.div`
  display: block;
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
  cursor: pointer;
  &:hover {
    ${Toggle} svg {
      path {
        stroke: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`
const BodyWrapper = styled.div<{ show: boolean }>`
  display: flex;
  height: 100%;
  max-height: ${({ show }) => (show ? '100vh' : '0px')};
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};

  overflow: hidden;
  transition: all cubic-bezier(0.43, 0.66, 0.68, 0.53) 0.5s;
`
