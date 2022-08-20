import dayjs from 'dayjs'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import CrossIcon from '../../components/svgs/cross'
import DustBinIcon from '../../components/svgs/dustbin'
import LocationIcon from '../../components/svgs/location'
import PenIcon from '../../components/svgs/pen'
import ResumeIcon from '../../components/svgs/resumeIcon'

interface IProps {
  event: any
  handleDelete: (id: string) => void
  setPopupData: (_val: any) => void
}
const PopupEvent: React.FC<IProps> = ({
  event,
  handleDelete,
  setPopupData,
}) => {
  const { data, date } = event
  const handleClose = (e: any) => {
    setPopupData(null)
  }

  return (
    <Fragment>
      <Wrapper className="popup-wrapper">
        <Popup className="event-details">
          <Fragment>
            <ActionButton>
              <Link
                data-test-id="popup-edit"
                to={{
                  pathname: `/calendar/event/edit`,
                  state: {
                    data,
                    date: date,
                  },
                }}
              >
                <span>
                  <PenIcon size="1.2rem" />
                </span>
              </Link>
              <span
                data-test-id="popup-delete"
                onClick={() => handleDelete(data.id)}
              >
                <DustBinIcon size="1.2rem" />
              </span>
              <span data-test-id="popup-close" onClick={handleClose}>
                <CrossIcon size="0.875rem" />
              </span>
            </ActionButton>
            <Details>
              <li>
                <span></span>
                <div>
                  <h3>{data.summary && data.summary}</h3>
                  <p>
                    {data.start && data.start.dateTime
                      ? dayjs(data.start.dateTime).format('MMM DD YYYY, h:mm a')
                      : data.start.date
                      ? dayjs(data.start.date).format('MMM DD YYYY')
                      : null}
                    {data.end && (
                      <Fragment>
                        &nbsp;-&nbsp;
                        {data.end.dateTime
                          ? dayjs(data.end.dateTime).format(
                              'MMM DD YYYY, h:mm a'
                            )
                          : data.end.date
                          ? dayjs(data.end.date).format('MMM DD YYYY')
                          : null}
                      </Fragment>
                    )}
                  </p>
                </div>
              </li>
              {data.location && (
                <li>
                  <span>
                    <LocationIcon size="1.3rem" />
                  </span>
                  <p>{data.location}</p>
                </li>
              )}
              {data.description && (
                <li>
                  <span style={{ paddingTop: '0.25rem' }}>
                    <ResumeIcon size="1.1rem" />
                  </span>
                  <p dangerouslySetInnerHTML={{ __html: data.description }} />
                </li>
              )}
            </Details>
          </Fragment>
        </Popup>
      </Wrapper>
    </Fragment>
  )
}

export default PopupEvent

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

const Popup = styled.div`
  width: 500px;
  height: 90vh;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 24px 38px 3px rgb(0 0 0 / 10%),
    0px 9px 46px 8px rgb(0 0 0 / 12%), 0px 11px 15px -7px rgb(0 0 0 / 20%);
  z-index: 10;
  margin: auto;
  transition: transform ease-in-out 100ms opacity ease-in-out 500ms;
`
const ActionButton = styled.div`
  display: flex;
  justify-content: end;
  margin: 0.5rem;

  span {
    height: 30px;
    width: 30px;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    transition: all ease-in-out 300ms;
    &:hover {
      background-color: #eee;
    }
  }
`
const Details = styled.ul`
  max-height: 500px;
  overflow-y: auto;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  li {
    display: grid;
    grid-template-columns: 40px auto;
    margin-bottom: 0.875rem;
    span {
      word-break: break-word;
      display: flex;
      justify-content: center;
      margin-top: 0.2rem;
    }
    p {
      word-break: break-word;
      margin: 0.1rem 0;
    }
    div {
      margin: 0;
      h3 {
        word-break: break-word;
        margin: 0;
        text-transform: none;
      }
    }
  }
`
