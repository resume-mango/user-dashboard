import React from "react"
import styled from "styled-components"
import image from "../public/images/comming-soon.svg"
import { Helmet } from "react-helmet"

const CommingSoon = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>Coming Soon</title>
        <meta name="description" content="Career Mango Coming Soon Page" />
      </Helmet>
      <div className="img-wrapper">
        <img src={image} alt="resume-mango-comming-soon" />
      </div>
      <h2>Coming Soon...</h2>
      <p>We are trying our best to launch it as soon as possible.</p>
    </Wrapper>
  )
}

export default CommingSoon

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  h2 {
    margin-bottom: 0.5rem;
  }
  p {
    margin: 0;
  }
  .img-wrapper {
    width: 450px;
    display: flex;
    margin-bottom: 1.5rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`
