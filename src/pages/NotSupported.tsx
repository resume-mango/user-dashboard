import React, { Fragment } from 'react'
import styled from 'styled-components'
import Image from '../components/svgs/error.svg'

const NotSupported = () => {
  return (
    <Wrapper>
      <div className="img-wrapper">
        <img src={Image} />
      </div>

      <h3>Sorry, Currently we don&apos;t support Mobile / Tablet view.</h3>
    </Wrapper>
  )
}

export default NotSupported

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  flex-direction: column;
  padding: 2rem;
  margin: auto;
  width: 100%;
  justify-content: center;
  h3 {
    text-align: center;
    line-height: 2;
  }
  .img-wrapper {
    width: 200px;
    height: 200px;
    margin-bottom: 2rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`
