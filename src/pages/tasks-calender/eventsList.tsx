import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import CrossIcon from '../../components/svgs/cross'
import detectOutsideClick from '../../hooks/detectOutsideClick'
import CalenderEvent from './event'

interface IProps {
  events: any
  date: string
  setPopupData: (_val: any) => void
}

const EventsList: React.FC<IProps> = ({ events, date, setPopupData }) => {
  const { isOutside, ref } = detectOutsideClick()
  const [showList, setShowList] = useState(false)

  useEffect(() => {
    setShowList(false)
  }, [isOutside])

  return (
    <Fragment>
      <Wrapper ref={ref}>
        <More onClick={() => setShowList(true)}>{events.length - 2} more</More>
        <EventsWrapper show={showList}>
          {showList && (
            <Fragment>
              <CloseButton>
                <a onClick={() => setShowList(false)}>
                  <CrossIcon size="0.875rem" />
                </a>
              </CloseButton>
              {events.map((event: any, i: number) => (
                <CalenderEvent
                  date={date}
                  key={i}
                  event={event}
                  setPopupData={setPopupData}
                />
              ))}
            </Fragment>
          )}
        </EventsWrapper>
      </Wrapper>
    </Fragment>
  )
}

export default EventsList

const Wrapper = styled.div`
  display: block;
  position: relative;
`
const More = styled.a`
  padding-left: 0.5rem;
  font-weight: 700;
  width: 100%;
  display: block;
  transition: all ease-in-out 300ms;
  &:hover {
    background-color: ${({ theme }) => theme.shades.primary[3]};
  }
  @media (max-width: 1400px) {
    font-size: 0.7rem;
  }
`
const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  a {
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    &:hover {
      background-color: #eee;
    }
  }
`

const EventsWrapper = styled.div<{ show: boolean }>`
  display: block;
  position: absolute;
  width: 100%;
  height: fit-content;
  bottom: 0;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 0 15px 1px rgb(0 0 0 / 20%);
  padding: 0.5rem;
  z-index: 1;
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  transform: scale(${({ show }) => (show ? 1 : 0.9)});
  transition: transform ease-in-out 200ms;
`
