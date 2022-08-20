import React, { Fragment, useState } from 'react'
import styled from 'styled-components'

const Toggle = ({ className }: { className?: string }) => {
  const [value, setValue] = useState(false)

  return (
    <Fragment>
      <Switch className={className}>
        <input
          type='checkbox'
          defaultChecked={value}
          onChange={() => setValue(!value)}
        />
        <Slider />
      </Switch>
    </Fragment>
  )
}

export default Toggle

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e7e7e7;
  transition: 0.4s;
  border-radius: 34px;

  &::before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 2px;
    background-color: #b0b0b0;
    transition: 0.4s;
    border-radius: 50%;
  }
`
const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin: 0;
  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + ${Slider}:before {
      transform: translateX(18px);
      background-color: rgba(255, 168, 20, 1);
    }
  }
`
