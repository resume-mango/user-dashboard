import React, { Fragment, useState, useEffect } from 'react'
import styled, { DefaultTheme, withTheme } from 'styled-components'
import CheckIcon from '../svgs/check'
import DangerIcon from '../svgs/danger'
import WarningIcon from '../svgs/warning'
import InfoIcon from '../svgs/info'
import CrossIcon from '../svgs/cross'
interface IProps {
  type: 'danger' | 'info' | 'warning' | 'success'
  theme: DefaultTheme
  message: string
  interval?: number
  id: number
}

const Message: React.FC<IProps> = ({ type, theme, message, interval, id }) => {
  const [show, setShow] = useState(false)
  const time = (interval as number) || 6000
  useEffect(() => {
    setShow(true)
    if (time === -1) return
    const interval = setInterval(() => {
      setShow(false)
    }, time)

    return () => {
      clearInterval(interval)
    }
  }, [id])

  useEffect(() => {
    if (message) setShow(true)
  }, [id])

  let icon

  switch (type) {
    case 'danger':
      icon = <DangerIcon color={theme.colors.danger} />
      break
    case 'warning':
      icon = <WarningIcon color={theme.colors.warning} />
      break
    case 'success':
      icon = <CheckIcon color={theme.colors.success} />
      break
    case 'info':
      icon = <InfoIcon color={theme.colors.info} />
      break
    default:
      break
  }

  return (
    <Fragment>
      {show && (
        <Wrapper type={type}>
          <div>
            {icon} <p>{JSON.stringify(message)}</p>
          </div>
          <div>
            <button onClick={() => setShow(false)}>
              <CrossIcon size='0.85rem' color={theme.colors[type]} />
            </button>
          </div>
        </Wrapper>
      )}
    </Fragment>
  )
}

export default withTheme(Message)

const Wrapper = styled.div<{ type: 'danger' | 'info' | 'warning' | 'success' }>`
  display: flex;
  padding: 0.6rem 1rem;
  align-items: center;
  border: 1px solid;
  border-radius: 7px;
  border-color: ${({ type, theme }) => theme.colors[type]};
  background-color: ${({ type, theme }) => theme.shades[type]};
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 1rem;
  div {
    display: flex;
    align-items: center;
    &:first-child {
      svg {
        min-width: 20px;
        min-height: 20px;
      }
    }
  }
  p {
    margin: 0 0.7rem;
    color: ${({ type, theme }) => theme.colors[type]};
  }

  button {
    cursor: pointer;
  }
`
