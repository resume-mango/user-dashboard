import React, { Fragment } from 'react'
import styled, { DefaultTheme, withTheme } from 'styled-components'
import DangerIcon from '../svgs/danger'
import { useHistory } from 'react-router'
import { Button } from '../../styled/button'
import WarningIcon from '../svgs/warning'
import CheckIcon from '../svgs/check'
import InfoIcon from '../svgs/info'
import { Transition, TransitionStatus } from 'react-transition-group'

interface IProps {
  type: 'danger' | 'info' | 'warning' | 'success'
  theme: DefaultTheme
  redirect?: string
  popup?: boolean
  heading?: string
  message?: string
  genricMsg?: '500'
  style?: any
  show: boolean
}

const Alert: React.FC<IProps> = ({
  theme,
  redirect,
  popup,
  type,
  heading,
  message,
  genricMsg,
  style,
  show
}) => {
  const history = useHistory()

  const redirectUser = () => {
    if (popup) return alert('Popup Close')
    if (!redirect) return history.goBack()
    else return history.push(redirect)
  }

  let icon: any
  switch (type) {
    case 'danger':
      icon = <DangerIcon size='100px' color={theme.colors.primary} />
      break
    case 'warning':
      icon = <WarningIcon size='100px' color={theme.colors.primary} />
      break
    case 'success':
      icon = <CheckIcon size='100px' color={theme.colors.primary} />
      break
    case 'info':
      icon = <InfoIcon size='100px' color={theme.colors.primary} />
      break
    default:
      break
  }

  let msg: string
  let title: string
  switch (genricMsg) {
    case '500':
      title = 'Error!'
      msg = 'Something went wrong.'
      break
    default:
      msg = message as string
      title = heading as string
      break
  }

  return (
    <Fragment>
      <Transition in={show} timeout={300}>
        {(state: TransitionStatus) => (
          <Wrapper
            state={state}
            style={{
              ...style
            }}
            className='align-center'
          >
            <div>
              {show && (
                <Fragment>
                  {icon}
                  <h2>{title}</h2>
                  <p>{msg}</p>
                  <Button
                    btnType='link'
                    size='xl'
                    onClick={() => redirectUser()}
                  >
                    Ok
                  </Button>
                </Fragment>
              )}
            </div>
          </Wrapper>
        )}
      </Transition>
    </Fragment>
  )
}

export default withTheme(Alert)

const Wrapper = styled.div<{ state: TransitionStatus }>`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(0 0 0 / 20%);
  z-index: 1000;
  opacity: ${({ state }) =>
    state === 'entered' || state === 'entering' ? 1 : 0};
  visibility: ${({ state }) =>
    state === 'entered' || state === 'entering' ? 'visible' : 'hidden'};
  transition: all 300ms ease-in-out;

  div {
    display: ${({ state }) =>
      state === 'entered' || state === 'entering' ? 'flex' : 'none'};
    flex-direction: column;
    justify-content: center !important;
    align-items: center;
    max-width: 400px;
    max-height: 400px;
    height: 100%;
    width: 100%;
    padding: 2rem;
    /* box-shadow: 5px 5px 10px 5px rgb(237 237 237 / 50%); */
    border: 1px solid rgb(237 237 237 / 20%);
    border-radius: 1rem;
    background-color: #fff;
  
  h2,
  p {
    text-align: center;
    margin: 0 0 1rem;
  }
  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  svg {
    margin-bottom: 2rem;
  }
  ${Button} {
    font-size: 1.2rem;
    color: white;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`
