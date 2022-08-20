import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { Button } from '../styled/button'
import CrossIcon from './svgs/cross'

interface IProps {
  show: boolean
  setShow: (_val: boolean) => void
  exludedPaths?: Array<string>
}

const RouterPrompt: React.FC<IProps> = ({ show, setShow, exludedPaths }) => {
  const history = useHistory()
  const [showPrompt, setShowPrompt] = useState(false)
  const [currentPath, setCurrentPath] = useState('')
  const [confirmedNavigation, setConfirmedNavigation] = useState(false)

  const unblockRef = useRef<any>()

  const handleShowModal = () => {
    setShowPrompt(true)
  }

  const onCancel = () => {
    setShowPrompt(false)
  }

  useEffect(() => {
    unblockRef.current = history.block((location) => {
      if (show) {
        if (
          exludedPaths &&
          exludedPaths?.length > 0 &&
          exludedPaths.includes(location.pathname)
        )
          return
        setCurrentPath(location.pathname)
        handleShowModal()
        return false
      }
    })

    return () => {
      unblockRef.current && unblockRef.current()
    }
  }, [show])

  useEffect(() => {
    if (confirmedNavigation && currentPath) {
      history.push(currentPath)
      // Clean-up state on confirmed navigation
      setConfirmedNavigation(false)
    }
  }, [confirmedNavigation, currentPath])

  const handleConfirm = useCallback(() => {
    setShow(false)
    if (unblockRef) {
      unblockRef.current()
    }
    setShowPrompt(false)
    setConfirmedNavigation(true)
  }, [])

  return showPrompt ? (
    <Wrapper className="prompt-wrapper">
      <Box>
        <CloseBtn onClick={onCancel}>
          <CrossIcon />
        </CloseBtn>
        <h3>Are you sure?</h3>
        <p>
          You haven&apos;t saved your changes, if you exit your changes will be
          lost
        </p>
        <ChildWrapper>
          <Button onClick={handleConfirm} btnType="ghost" size="lg">
            Ok
          </Button>
          <Button onClick={onCancel} btnType="primary" size="lg">
            Cancel
          </Button>
        </ChildWrapper>
      </Box>
    </Wrapper>
  ) : null
}

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

const Box = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 450px;
  height: auto;
  width: 100%;
  padding: 1.5rem;
  border: 1px solid rgb(237 237 237 / 20%);
  border-radius: 6px;
  background-color: #fff;

  h3 {
    text-align: center;
    margin: 1.5rem 0 0;
  }
  p {
    text-align: center;
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`

const ChildWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-left: auto;
`

const CloseBtn = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  &:hover {
    svg {
      path {
        stroke: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`

export default RouterPrompt
