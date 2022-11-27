import dayjs from 'dayjs'
import React, { Fragment, useState } from 'react'
import { useQueryClient } from 'react-query'
import { Link, useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import DownArrowIcon from '../../components/svgs/downArrow'
import Alert from '../../components/ui/alert'
import useCalender from '../../helpers/calender'
import { getCalendar } from '../../queries/calendarQueries'
import CalenderEvent from './event'
import EventsList from './eventsList'
import { apiDeleteEvent } from '../../apis/calendar'
import { useNotify } from '../../contexts/notify'
import { Spinner } from '../../styled/loader'
import { LinkButton } from '../../styled/button'
import PopupEvent from './popupEvent'

const Calender: React.FC = () => {
  const { year, month, day } = useParams<any>()

  const history = useHistory()

  const currentDate = dayjs(`${year}/${month}/${day}`)
  if (!currentDate.isValid()) {
    history.push(`/calendar/view/${dayjs().format('YYYY/MM/DD')}`)
    return <></>
  }

  // const [show, setShow] = useState<string | null>(null)
  const [popupData, setPopupData] = useState<Record<string, any> | null>(null)

  const { setNotify } = useNotify()
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error } = getCalendar(year)

  const {
    getDatesForCurrMonth: curr,
    getDatesForPrevMonth: prev,
    getDatesforNextMonth: next,
    weekdays,
  } = useCalender(currentDate)

  const handleClick = (type: 'next' | 'prev') => {
    if (type === 'next') {
      history.push(
        `/calendar/view/${currentDate
          .add(1, 'month')
          .startOf('month')
          .format('YYYY/MM/DD')}`
      )
    } else {
      history.push(
        `/calendar/view/${currentDate
          .subtract(1, 'month')
          .startOf('month')
          .format('YYYY/MM/DD')}`
      )
    }
  }

  const dates = [...prev, ...curr, ...next]

  const handleDelete = async (id: string) => {
    const storedData = data
    const currYear = currentDate.format('YYYY')
    // if (eventYear !== currYear) {
    //   currYear = eventYear
    //   data.filter((item: any) => item.id !== id)
    //   storedData = queryClient.getQueryData(['calendar', eventYear])
    //   queryClient.setQueryData(['calendar', currYear], data)
    // }
    if (storedData) {
      const newData = storedData.filter((item: any) => item.id !== id)
      queryClient.setQueryData(['calendar', currYear], newData)
    }
    const { data: resData, error } = await apiDeleteEvent(id)

    if (!resData || error) {
      queryClient.setQueryData(
        ['calendar', currentDate.format('YYYY')],
        storedData
      )
      setNotify({
        type: 'danger',
        heading: 'Err!',
        message: 'Failed to delete event',
      })
      // console.log(error)
    }
    setPopupData(null)
  }

  data &&
    data.forEach((item: any) => {
      let date: any

      if (!item.start) return
      item.start.dateTime
        ? (date = item.start.dateTime.split('T')[0])
        : item.start.date
        ? (date = item.start.date)
        : (date = null)

      if (!date) return

      if (dayjs(date).format('YYYY') !== year) return

      const found = dates.findIndex((obj) => {
        return obj.date == dayjs(date).format('YYYY-MM-D')
      })
      if (found === -1) return
      dates[found].events.push(item as any)
    })

  return (
    <Fragment>
      <Wrapper>
        <Fragment>
          <Header>
            <div>
              <h2>Manage your Daily Tasks</h2>
              {data && (
                <Link
                  to={{
                    pathname: '/calendar/event/new',
                    state: {
                      date: currentDate,
                    },
                  }}
                >
                  <LinkButton data-test-id="add-event"> Add Event</LinkButton>
                </Link>
              )}
            </div>
            <div>
              <Link to={`/calendar/view/${dayjs().format('YYYY/MM/DD')}`}>
                <LinkButton> Today</LinkButton>
              </Link>
              <ToggleButton
                data-test-id="calendar-prev"
                style={{ transform: 'rotateZ(90deg)', marginLeft: '0.6rem' }}
                onClick={() => handleClick('prev')}
              >
                <DownArrowIcon />
              </ToggleButton>
              <ToggleButton
                style={{ transform: 'rotateZ(270deg)', marginRight: '0.6rem' }}
                onClick={() => handleClick('next')}
                data-test-id="calendar-next"
              >
                <DownArrowIcon />
              </ToggleButton>
              <h3 data-test-id="calendar-current">
                {dayjs(currentDate).format('MMMM YYYY')}
              </h3>
            </div>
          </Header>
          {isLoading && !data ? (
            <div className="align-center" style={{ height: '30vh' }}>
              <Spinner size="40px" type="primary" />
            </div>
          ) : isError ? (
            <>
              {error.response &&
              error.response.data.error.message === 'invalid_grant' ? (
                <Alert
                  show={isError}
                  type="warning"
                  heading="Oops"
                  message="Your calendar token was expired please relogin."
                  redirect="/logout"
                />
              ) : (
                <div className="align-center" style={{ height: '30vh' }}>
                  <h3>Failed to Fetch Calendar</h3>
                </div>
              )}
            </>
          ) : (
            <div id="calendarWrapper">
              {popupData && (
                <PopupEvent
                  event={popupData}
                  setPopupData={setPopupData}
                  handleDelete={handleDelete}
                />
              )}
              <WeekDayGrid>
                {weekdays.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </WeekDayGrid>
              <DateGrid>
                {dates.map((item, i) => (
                  <StyledDate
                    key={i}
                    today={dayjs().isSame(item.date.toString(), 'day')}
                    data-test-id={
                      (dayjs().isSame(item.date.toString()),
                      day ? 'active' : 'inactive')
                    }
                  >
                    <StyledDateHeading currentMonth={item.isCurr}>
                      {item.isCurr
                        ? item.day
                        : dayjs(item.date).format('MMMM') + ' ' + item.day}
                    </StyledDateHeading>
                    {item.events.length > 0 && (
                      <div>
                        {item.events.map((event: any, i: number) => {
                          return (
                            i < 2 && (
                              <CalenderEvent
                                key={i}
                                date={item.date}
                                event={event}
                                setPopupData={setPopupData}
                              />
                            )
                          )
                        })}

                        {item.events.length > 2 && (
                          <EventsList
                            date={item.date}
                            events={item.events}
                            setPopupData={setPopupData}
                          />
                        )}
                      </div>
                    )}
                  </StyledDate>
                ))}
              </DateGrid>
            </div>
          )}
        </Fragment>
      </Wrapper>
    </Fragment>
  )
}

export default Calender

const Wrapper = styled.div`
  padding: 0 1.5rem;
`

const WeekDayGrid = styled.ol`
  display: grid;
  grid-template-columns: repeat(7, 14.29%);
  align-items: center;
  justify-items: center;
  border-bottom: 1px solid #e7e7e7;
  li {
    user-select: none;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 700;
    width: 100%;
    height: 6vh;
    color: rgba(107, 107, 107, 1);
    border-left: 1px solid #e7e7e7;
    &:nth-child(7) {
      border-right: 1px solid #e7e7e7;
    }
  }
  @media (max-width: 1400px) {
    li {
      font-size: 0.8rem;
    }
  }
`
const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e7e7e7;
  padding: 2rem 0 1.5rem;
  div {
    display: flex;
    align-items: center;
    h2 {
      margin-bottom: 0;
      margin-right: 1rem;
    }
    h3 {
      width: 150px;
      margin-bottom: 0;
      font-size: 1rem;
    }
  }
`

const ToggleButton = styled.button`
  width: 30px;
  height: 30px;
  margin: 0 0.2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all ease-in-out 300ms;
  &:hover {
    background-color: ${({ theme }) => theme.shades.primary[4]};
  }
  svg {
    path {
      stroke-width: 1.6;
    }
  }
`

const DateGrid = styled.ol`
  display: grid;
  grid-template-columns: repeat(7, 14.29%);
  align-items: center;
  justify-items: center;
  margin-bottom: 3rem;
`
const StyledDate = styled.li<{ today?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  height: 150px;
  border-left: 1px solid #e7e7e7;

  border-bottom: 1px solid #e7e7e7;
  background-color: ${({ today }) => today && '#F4F4F6'};
  position: relative;
  &:nth-of-type(7n) {
    border-right: 1px solid #e7e7e7;
  }
  @media (max-width: 1400px) {
    height: 120px;

    font-size: 0.8rem;
  }
`
const StyledDateHeading = styled.h3<{ currentMonth?: boolean }>`
  text-transform: uppercase;
  font-size: 1rem;
  color: ${({ currentMonth }) =>
    currentMonth ? '#6B6B6B' : 'rgba(107, 107, 107, 0.5)'};
  margin-left: 1rem;
  margin-top: 1rem;
  margin-bottom: 0;
  @media (max-width: 1400px) {
    font-size: 0.8rem;
  }
`
