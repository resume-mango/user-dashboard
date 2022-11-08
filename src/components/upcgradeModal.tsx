import React, { Fragment } from 'react'
import image from '../public/images/items-in-box.png'
import check from '../public/images/check-filled.svg'
import { Button } from '../styled/button'
import CrossIcon from './svgs/cross'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const UpgradePlan = ({ handleClose }: { handleClose: () => void }) => {
  const history = useHistory()

  return (
    <Fragment>
      <Wrapper>
        <div className="container">
          <Modal>
            <CloseBtn onClick={handleClose}>
              <CrossIcon size="1.2rem" />
            </CloseBtn>
            <h1>Upgrade your plan to unlock these features</h1>
            <ModalBody>
              <FeaturesWrapper>
                <p className="item">
                  <img src={check} />
                  <span>Unlimited resumes</span>
                </p>
                <p className="item">
                  <img src={check} />
                  <span>Unlimited coverletters</span>
                </p>
                <p className="item">
                  <img src={check} />
                  <span>Progress tracker </span>
                </p>
                <p className="item">
                  <img src={check} />
                  <span>Calendar</span>
                </p>
                <p className="item">
                  <img src={check} />
                  <span>Task Manager</span>
                </p>
                <Button
                  btnType="primary"
                  size="lg"
                  onClick={() => history.push('/subscribe')}
                >
                  Upgrade
                </Button>
              </FeaturesWrapper>
              <ImageWrapper>
                <img src={image} />
              </ImageWrapper>
            </ModalBody>
          </Modal>
        </div>
      </Wrapper>
    </Fragment>
  )
}

export default UpgradePlan

const Wrapper = styled.div`
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgb(0 0 0 / 18%);
  z-index: 1000;
  top: 0;
  left: 0;
  .container {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
`
const Modal = styled.div`
  position: relative;
  display: block;
  padding: 4rem;
  width: 800px;
  height: 600px;
  background-color: #fff;
  h1 {
    line-height: 39px;
    letter-spacing: 0.045em;
    max-width: 475px;
  }
`

const ModalBody = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
`
const ImageWrapper = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: flex-end;
  align-items: center;
  img {
    width: 90%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }
`
const FeaturesWrapper = styled.div`
  margin: 2rem 0;
  button {
    margin-top: 2rem;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0.7rem 0;
    margin: 0;
    font-size: 1rem;
    img {
      margin-right: 1rem;
    }
  }
`
const CloseBtn = styled.div`
  padding: 1rem;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  :hover {
    svg {
      path {
        stroke: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`
