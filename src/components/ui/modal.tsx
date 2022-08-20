import React, { Fragment } from 'react'
import styled from 'styled-components'

const Modal = ({ show, setShow, children }) => {
  return <Fragment>{show && <Wrapper>{children}</Wrapper>}</Fragment>
}

export default Modal

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.shades.dark[3]};
`
