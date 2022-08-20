import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import DownArrowIcon from '../../../components/svgs/downArrow'
import useCalender from '../../../helpers/calender'
import { getCalendar } from '../../../queries/calendarQueries'
import { Link } from 'react-router-dom'
import { SK_Thumbnail, SK_Wrapper } from '../../../styled/loader'
import { eventAdder } from '../../../helpers/eventAdderToCalendar'

const SmallCalender = () => {
  const [currentDate, setCurrentDate] = useState(dayjs())
  const {
    getDatesForCurrMonth: curr,
    getDatesForPrevMonth: prev,
    getDatesforNextMonth: next,
    weekdays,
  } = useCalender(currentDate)

  const handleClick = (type: 'next' | 'prev') => {
    if (type === 'next') {
      setCurrentDate(currentDate.add(1, 'month'))
    } else {
      setCurrentDate(currentDate.subtract(1, 'month'))
    }
  }

  const { data, isLoading, isError } = getCalendar(currentDate.format('YYYY'))
  const dates = eventAdder([...prev, ...curr, ...next], data)

  return (
    <Fragment>
      <Wrapper>
        <Header>
          <div>
            <h3>{dayjs(currentDate).format('MMMM YYYY')}</h3>
          </div>
          <div>
            <button
              style={{ transform: 'rotateZ(90deg)' }}
              onClick={() => handleClick('prev')}
              className="prev-btn"
            >
              <DownArrowIcon />
            </button>
            <button
              style={{ transform: 'rotateZ(270deg)' }}
              onClick={() => handleClick('next')}
              className="next-btn"
            >
              <DownArrowIcon />
            </button>
          </div>
        </Header>
        <CalenderWrapper>
          <WeekGrid>
            {weekdays.map((day, i) => (
              <li key={i}>{day}</li>
            ))}
          </WeekGrid>
          {isError ? (
            <h3>Failed to fetch calendar events</h3>
          ) : isLoading ? (
            <Loader>
              <SK_Wrapper>
                <SK_Thumbnail />
              </SK_Wrapper>
            </Loader>
          ) : data ? (
            <DatesGrid>
              {dates.map((item, i) => (
                <Fragment key={i}>
                  {item.events.length > 0 ? (
                    <Link
                      to={{
                        pathname: `/calendar/view/${dayjs(item.date).format(
                          'YYYY/MM/DD'
                        )}`,
                      }}
                    >
                      <StyledDate
                        active={item.events.length > 0}
                        today={dayjs().isSame(item.date.toString(), 'day')}
                        isCurr={item.isCurr}
                        events={item.events.length > 0 && item.events.length}
                        className={item.isCurr ? 'today' : ''}
                      >
                        {item.day}
                      </StyledDate>
                    </Link>
                  ) : (
                    <StyledDate
                      active={item.events.length > 0}
                      today={dayjs().isSame(item.date.toString(), 'day')}
                      isCurr={item.isCurr}
                      events={item.events.length > 0 && item.events.length}
                    >
                      {item.day}
                    </StyledDate>
                  )}
                </Fragment>
              ))}
            </DatesGrid>
          ) : null}
        </CalenderWrapper>
      </Wrapper>
    </Fragment>
  )
}

export default SmallCalender

const Wrapper = styled.div`
  display: block;
  padding: 1.25rem;
`
const Loader = styled.div`
  ${SK_Thumbnail} {
    width: 100%;
    height: 300px;
  }
`

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    button {
      width: 30px;
      height: 30px;
      display: flex;
      border-radius: 50%;
      margin: 0 0.2rem;
      align-items: center;
      justify-content: center;
      transition: all ease-in-out 200ms;
      &:hover {
        background-color: ${({ theme }) => theme.shades.primary[4]};
      }
      svg {
        path {
          stroke-width: 1.6;
        }
      }
    }
    h3 {
      margin-bottom: 0;
      font-size: 1rem;
    }
  }
`
const CalenderWrapper = styled.div`
  margin-top: 1rem;
`
const WeekGrid = styled.ol`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 0.5rem;
  align-items: center;
  justify-items: center;
  margin-bottom: 1.7rem;
  li {
    user-select: none;
    text-transform: uppercase;
    text-align: center;
    font-size: 0.675rem;
    color: rgba(197, 197, 197, 1);
  }
`
const DatesGrid = styled.ol`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 0.5rem;
  align-items: center;
  justify-content: center;
  justify-items: center;
  @media (max-width: 1400px) {
    grid-gap: 0.2rem;
  }
`
const StyledDate = styled.li<{
  active: boolean
  events: string
  today: boolean
  isCurr: boolean
}>`
  user-select: none;
  text-align: center;
  position: relative;
  z-index: 1;
  width: 45px;
  height: 45px;
  background-color: ${({ active }) => active && 'rgba(240, 132, 56, 0.18)'};
  color: ${({ active, today, isCurr }) =>
    active || today ? '#f08438' : isCurr ? '' : '#bbb'};
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &:after {
    top: -5px;
    right: -2px;
    ${({ events }) => events && `content: '${events}';`}
    color: white;
    display: inline-flex;
    width: 20px;
    height: 20px;
    position: absolute;
    background-color: #f08438;
    border-radius: 50%;
    z-index: 1;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 1400px) {
    width: 35px;
    height: 35px;

    &:after {
      width: 15px;
      height: 15px;
      font-size: 0.6rem;
    }
  }
`
