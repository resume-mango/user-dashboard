import dayjs from 'dayjs'
import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import CrossIcon from '../../components/svgs/cross'
import DustBinIcon from '../../components/svgs/dustbin'
import LocationIcon from '../../components/svgs/location'
import PenIcon from '../../components/svgs/pen'
import ResumeIcon from '../../components/svgs/resumeIcon'
import detectOutsideClick from '../../hooks/detectOutsideClick'

interface IProps {
  event: any
  date: string
  setPopupData: (_val: any) => void
}

const options = (opacity: number) => [
  { id: 1, color: `rgba(121, 134, 203, ${opacity})` },
  { id: 2, color: `rgba(51, 182, 121, ${opacity})` },
  { id: 3, color: `rgba(142, 36, 170, ${opacity})` },
  { id: 4, color: `rgba(230, 124, 115, ${opacity})` },
  { id: 5, color: `rgba(246, 192, 38, ${opacity})` },
  { id: 6, color: `rgba(245, 81, 29, ${opacity})` },
  { id: 7, color: `rgba(3, 155, 229, ${opacity})` },
  { id: 8, color: `rgba(97, 97, 97, ${opacity})` },
  { id: 9, color: `rgba(63, 81, 181, ${opacity})` },
  { id: 10, color: `rgba(11, 128, 67, ${opacity})` },
  { id: 11, color: `rgba(214, 0, 0, ${opacity})` },
]

const borderColors = options(1)
const backgroundColors = options(0.2)

const CalenderEvent: React.FC<IProps> = ({ event, date, setPopupData }) => {
  const handleOpen = (e: any) => {
    setPopupData({ data: event, date })
    e.stopPropagation()
    e.preventDefault()
  }

  return (
    <Fragment>
      <Wrapper>
        <Event
          onClick={handleOpen}
          className="truncate"
          borderColor={
            event.colorId
              ? borderColors[event.colorId - 1].color
              : borderColors[6].color
          }
          backgroundColor={
            event.colorId
              ? backgroundColors[event.colorId - 1].color
              : backgroundColors[6].color
          }
        >
          {event.summary}
        </Event>
        {/* <PopupWrapper show={show} className="event-details">
          {show && (
            <Fragment>
              <ActionButton>
                <Link
                  to={{
                    pathname: `/calendar/event/edit`,
                    state: {
                      data: event,
                      date: date,
                    },
                  }}
                >
                  <span>
                    <PenIcon size="1.2rem" />
                  </span>
                </Link>
                <span onClick={() => handleDelete(event.id, date)}>
                  <DustBinIcon size="1.2rem" />
                </span>
                <span onClick={handleClose}>
                  <CrossIcon size="0.875rem" />
                </span>
              </ActionButton>
              <Details>
                <li>
                  <span></span>
                  <div>
                    <h3>{event.summary && event.summary}</h3>
                    <p>
                      {event.start && event.start.dateTime
                        ? dayjs(event.start.dateTime).format(
                            'MMM DD YYYY, h:mm a'
                          )
                        : event.start.date
                        ? dayjs(event.start.date).format('MMM DD YYYY')
                        : null}
                      {event.end && (
                        <Fragment>
                          &nbsp;-&nbsp;
                          {event.end.dateTime
                            ? dayjs(event.end.dateTime).format(
                                'MMM DD YYYY, h:mm a'
                              )
                            : event.end.date
                            ? dayjs(event.end.date).format('MMM DD YYYY')
                            : null}
                        </Fragment>
                      )}
                    </p>
                  </div>
                </li>
                {event.location && (
                  <li>
                    <span>
                      <LocationIcon size="1.3rem" />
                    </span>
                    <p>{event.location}</p>
                  </li>
                )}
                {event.description && (
                  <li>
                    <span style={{ paddingTop: '0.25rem' }}>
                      <ResumeIcon size="1.1rem" />
                    </span>
                    <p
                      dangerouslySetInnerHTML={{ __html: event.description }}
                    />
                  </li>
                )}
              </Details>
            </Fragment>
          )}
        </PopupWrapper> */}
      </Wrapper>
    </Fragment>
  )
}

export default CalenderEvent

const Event = styled.p<{ backgroundColor: string; borderColor: string }>`
  cursor: pointer;
  font-weight: 700;
  display: block;
  border-left: 3px solid ${({ borderColor }) => borderColor};
  font-size: 0.8rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 0.5rem 0 0.5rem 1rem;
  margin: 0.5rem 0 0;
  @media (max-width: 1400px) {
    padding: 0.2rem 0 0.2rem 1rem;
  }
`
const Wrapper = styled.div`
  position: relative;
`
// const PopupWrapper = styled.div<{ show: boolean }>`
//   width: 500px;
//   position: absolute;
//   background-color: white;
//   border-radius: 6px;
//   box-shadow: 0px 24px 38px 3px rgb(0 0 0 / 14%),
//     0px 9px 46px 8px rgb(0 0 0 / 12%), 0px 11px 15px -7px rgb(0 0 0 / 20%);
//   /* visibility: ${({ show }) => (show ? 'visible' : 'hidden')}; */
//   /* opacity: 0; */
//   z-index: 10;
//   margin: auto;
//   scale: 0;
//   transition: transform ease-in-out 100ms opacity ease-in-out 500ms;
// `
// const ActionButton = styled.div`
//   display: flex;
//   justify-content: end;
//   margin: 0.5rem;

//   span {
//     height: 30px;
//     width: 30px;
//     margin-left: 0.2rem;
//     margin-right: 0.2rem;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     border-radius: 50%;
//     cursor: pointer;
//     transition: all ease-in-out 300ms;
//     &:hover {
//       background-color: #eee;
//     }
//   }
// `
// const Details = styled.ul`
//   max-height: 500px;
//   overflow-y: auto;
//   padding: 0.5rem 1rem 0.5rem 0.5rem;
//   li {
//     display: grid;
//     grid-template-columns: 40px auto;
//     margin-bottom: 0.875rem;
//     span {
//       word-break: break-word;
//       display: flex;
//       justify-content: center;
//       margin-top: 0.2rem;
//     }
//     p {
//       word-break: break-word;
//       margin: 0.1rem 0;
//     }
//     div {
//       margin: 0;
//       h3 {
//         word-break: break-word;
//         margin: 0;
//         text-transform: none;
//       }
//     }
//   }
// `
