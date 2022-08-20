import React, { Fragment } from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
import { LoadingDots, Spinner } from '../../styled/loader'
import CheckIcon from '../svgs/check'

interface IProps {
  loading: boolean
  startText: string
  endText: string
}

const Loading: React.FC<IProps> = ({ loading, startText, endText }) => {
  return (
    <Fragment>
      <CSSTransition
        in={loading}
        timeout={{
          enter: 200,
          exit: 5000,
        }}
      >
        <Wrapper>
          {loading ? (
            <Fragment>
              <Spinner type="primary" size="1.2rem" />
              <LoadingDots color="#f08438">{startText}</LoadingDots>
            </Fragment>
          ) : (
            <Fragment>
              <CheckIcon size="1.2rem" color="#f08438" />
              <p style={{ color: '#f08438' }}>{endText}</p>
            </Fragment>
          )}
        </Wrapper>
      </CSSTransition>
    </Fragment>
  )
}

export default Loading

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  opacity: 0;
  visibility: hidden;

  &.enter-done,
  &.enter-active,
  &.exit-active {
    opacity: 1;
    visibility: visible;
  }
  &.exit-done {
    opacity: 0;
    visibility: hidden;
  }
  p {
    font-size: 0.875rem;
    margin: 0 0 0 0.5rem;
  }
`
