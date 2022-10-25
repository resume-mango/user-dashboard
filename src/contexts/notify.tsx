import React, { useEffect, useState } from 'react'
import styled, { DefaultTheme } from 'styled-components'
import CheckIcon from '../components/svgs/check'
import DangerIcon from '../components/svgs/danger'
import InfoIcon from '../components/svgs/info'
import WarningIcon from '../components/svgs/warning'
import idGenerate from '../helpers/idGenerator'
import Crossimg from '../public/images/cross.svg'

interface IProps {
  children?: any
  theme?: DefaultTheme
}

export interface INotify {
  type: 'success' | 'info' | 'warning' | 'danger'
  heading: string
  message?: string
}

interface IList extends INotify {
  id: string
}

/* istanbul ignore next */
const contextValues = {
  setNotify: (_notify: INotify | null) => {
    return
  },
}

const NotifyContext = React.createContext(contextValues)

const NotifyProvider = (props: IProps) => {
  const [list, setList] = useState<Array<IList>>([])
  const [notify, setNotify] = useState<INotify | null>(null)

  useEffect(() => {
    if (!notify) return
    const newList: IList = {
      id: idGenerate(),
      ...notify,
    }

    setList([...list, newList])
  }, [notify])

  useEffect(() => {
    const interval = setInterval(() => {
      if (list && list.length > 0) {
        removeItem(list[0].id)
      }
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [list])

  const removeItem = (id: string) => {
    const itemIndex = list.findIndex((e: any) => e.id === id)
    list.splice(itemIndex, 1)
    setList([...list])
  }

  return (
    <NotifyContext.Provider
      value={{
        setNotify,
      }}
    >
      <NotifyWrapper active={list.length > 0} className="toast-wrapper">
        {list.length > 0 &&
          list.map((item: any, i: number) => (
            <Item key={i} type={item.type}>
              {item.type === 'success' ? (
                <CheckIcon size="2rem" />
              ) : item.type === 'info' ? (
                <InfoIcon size="2rem" />
              ) : item.type === 'warning' ? (
                <WarningIcon size="2rem" />
              ) : item.type === 'danger' ? (
                <DangerIcon size="2rem" />
              ) : null}
              <Message>
                <Heading>{item.heading}</Heading>
                <SubHeading>{item.message}</SubHeading>
              </Message>
              <Close>
                <button onClick={() => removeItem(item.id)}>
                  <img src={Crossimg} className="cross" width="10px" />
                </button>
              </Close>
            </Item>
          ))}
      </NotifyWrapper>
      {props.children}
    </NotifyContext.Provider>
  )
}

const useNotify = () => {
  const { setNotify } = React.useContext(NotifyContext)

  return { setNotify }
}

export { NotifyProvider, useNotify }

const NotifyWrapper = styled.div<{ active: boolean }>`
  display: grid;
  grid-gap: 1rem;
  width: 100%;
  height: fit-content;
  max-height: 100vh;
  max-width: 500px;
  position: fixed;
  top: 5vh;
  right: 0;
  padding: 1rem;
  z-index: ${({ active }) => (active ? 2000 : -1)};
`
const Item = styled.div<{ type: 'success' | 'info' | 'warning' | 'danger' }>`
  display: flex;
  position: relative;
  height: fit-content;
  padding: 0.5rem 0;
  width: 100%;
  background-color: white;
  border-radius: 0.5rem;
  /* box-shadow: 0 0 10px 1px #eee; */
  box-shadow: 8px 1px 10px 8px #0000000d;
  border: 1px solid #eee;
  align-items: center;
  &::before {
    content: '';
    background-color: ${({ type, theme }) =>
      type === 'success'
        ? theme.colors.success
        : type === 'warning'
        ? theme.colors.warning
        : type === 'danger'
        ? theme.colors.danger
        : theme.colors.info};
    height: 95%;
    width: 7px;
    display: block;
    margin: 0 0.5rem;
    border-radius: 20%;
  }

  svg {
    margin: 0 0.3rem;
    fill: ${({ type, theme }) =>
      type === 'success'
        ? theme.colors.success
        : type === 'warning'
        ? theme.colors.warning
        : type === 'danger'
        ? theme.colors.danger
        : theme.colors.info};
  }
`
const Message = styled.div`
  margin: 0 0.5rem;
  width: 85%;
  p {
    margin: 0;
  }
`
const Heading = styled.p`
  font-weight: 600;
  font-size: 1rem;
`
const SubHeading = styled.p`
  font-size: 0.875rem;
`
const Close = styled.div`
  width: 15%;
  button {
    user-select: none;
    cursor: pointer;
  }
`
