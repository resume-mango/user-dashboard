import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import CrossIcon from '../../components/svgs/cross'
import Modal from '../../components/ui/modal'
import Search from '../../components/ui/search'
import {
  GetReviewParams,
  getReviewTickets,
  getReviewTicketsCreatedCount,
} from '../../queries/chatQueries'
import { getAllResumes, GetResumesParams } from '../../queries/resumeQueries'
import { Button } from '../../styled/button'
import { LoadingWrapper, Spinner } from '../../styled/loader'
import { PaginationWrapper } from '../../styled/pages'

const ReviewList = () => {
  dayjs.extend(relativeTime)

  const [showModal, setShowModal] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)
  const [ReviewPage, setReviewPage] = useState(0)
  const history = useHistory()

  const params: GetResumesParams = {
    page,
    limit: 15,
  }

  const reviewParams: GetReviewParams = {
    page: ReviewPage,
    limit: 15,
  }
  if (query) {
    params.title = query
  }

  const { data, isLoading, isError } = getAllResumes(params, showModal)

  const {
    data: reviewData,
    isLoading: reviewLoading,
    isError: reviewError,
  } = getReviewTickets(reviewParams)

  const {
    data: ticketCreatedData,
    isLoading: ticketCreatedLoading,
    isError: ticketCreatedError,
  } = getReviewTicketsCreatedCount()

  const handlePage = (type: 'review' | 'resume', action: 'next' | 'prev') => {
    if (action === 'next') {
      type === 'review'
        ? setReviewPage((page) => page + 1)
        : setPage((page) => page + 1)
    }
    if (action === 'prev') {
      type === 'review'
        ? setReviewPage((page) => page - 1)
        : setPage((page) => page - 1)
    }
  }

  const handleSearch = () => {
    setQuery(searchValue)
  }
  return (
    <Fragment>
      <StyledDashHeader>
        <div className="header-wrapper">
          <h1>Request Review</h1>
          <Button
            btnType="primary"
            size="sm"
            onClick={() => setShowModal(true)}
            disabled={
              ticketCreatedLoading ||
              ticketCreatedError ||
              !ticketCreatedData ||
              ticketCreatedData.count >= ticketCreatedData.total
            }
          >
            Request Review
          </Button>
        </div>
        <div>
          {!ticketCreatedLoading && !ticketCreatedError && ticketCreatedData && (
            <p>
              <span>
                {ticketCreatedData.count || 0}/{ticketCreatedData.total || 0}
                &nbsp;
              </span>
              Resumes can be reviewed this month
            </p>
          )}
        </div>
      </StyledDashHeader>
      <Modal show={showModal}>
        <ModalWrapper data-test-id="select-resume">
          <div className="title">
            <h3>Select Resume</h3>
            <span className="close-icon" onClick={() => setShowModal(false)}>
              <CrossIcon />
            </span>
          </div>
          {isError ? (
            <div className="align-center" style={{ height: '90%' }}>
              <h3>Failed to load resumes!</h3>
            </div>
          ) : isLoading ? (
            <LoadingWrapper style={{ height: '90%' }}>
              <Spinner size="2rem" type="primary" />
            </LoadingWrapper>
          ) : data && data.items && data.items.length > 0 ? (
            <Fragment>
              <div className="search">
                <Search
                  placeholder={'Title of your resume...'}
                  value={searchValue}
                  setValue={setSearchValue}
                  handleSubmit={() => handleSearch()}
                  style={{ width: '100%' }}
                />
              </div>
              <div className="list-wrapper">
                <div className="list">
                  {data.items.map((item: Record<string, any>, i: number) => (
                    <div
                      className="item"
                      key={i}
                      onClick={() =>
                        history.push({
                          pathname: '/resume-review/new',
                          search: `?ref=${item._id}`,
                        })
                      }
                    >
                      {item.attachments && item.attachments.thumbnail ? (
                        <img src={item.attachments.thumbnail} />
                      ) : (
                        <img src="https://resume-mango.s3.us-east-2.amazonaws.com/public/template-images/resumes/empty/template10.jpg" />
                      )}
                      <p>{item.title || 'Untitled'}</p>
                    </div>
                  ))}
                </div>
                {data.total > params.limit && (
                  <PaginationWrapper data-test-id="pagination">
                    <Button
                      btnType="secondary"
                      disabled={page === 0}
                      onClick={() => handlePage('resume', 'prev')}
                      data-test-id="pagination-prev"
                    >
                      Previous
                    </Button>
                    <Button
                      btnType="secondary"
                      disabled={page + 1 >= Math.ceil(data.total / data.limit)}
                      onClick={() => handlePage('resume', 'next')}
                      data-test-id="pagination-next"
                    >
                      Next
                    </Button>
                  </PaginationWrapper>
                )}
              </div>
            </Fragment>
          ) : (
            <div className="align-center" style={{ height: '90%' }}>
              <div>
                <h3>No resumes found!</h3>
                <Button
                  btnType="primary"
                  size="sm"
                  onClick={() => history.push('/resumes/new')}
                  style={{ margin: '2rem auto' }}
                >
                  Create Resume
                </Button>
              </div>
            </div>
          )}
        </ModalWrapper>
      </Modal>

      <Wrapper>
        {reviewError ? (
          <div className="align-center" style={{ height: '50vh' }}>
            <h3>Failed to load review tickets!</h3>
          </div>
        ) : reviewLoading ? (
          <LoadingWrapper style={{ height: '50vh' }}>
            <Spinner size="2.5rem" type="primary" />
          </LoadingWrapper>
        ) : reviewData && reviewData.items && reviewData.items.length > 0 ? (
          <div data-test-id="list-wrapper">
            <h3>
              All Conversations
              <span className="count">{reviewData.total}</span>
            </h3>
            <ListTitle className="grey">
              <p>TITLE</p>
              <p>TICKET ID</p>
              <p>STATUS</p>
              <p>REVIEWER</p>
              <p>CURRENT STATUS</p>
            </ListTitle>
            {reviewData.items.map((item: Record<string, any>, i: number) => (
              <ListItem
                data-test-id="list-item"
                key={i}
                onClick={() => history.push(`resume-review/${item._id}`)}
              >
                <div className="title item">
                  <p>
                    {(item.resume && item.resume.title) || 'Untitled Resume'}
                  </p>
                  <div className="title-label">
                    <span>
                      Created {dayjs(dayjs(item.createdAt)).fromNow(true)} ago
                    </span>
                    {item.status === 'open' && (
                      <Fragment>
                        <span className="divider" />
                        <span>
                          {dayjs(item.createdAt)
                            .add(48, 'hour')
                            .diff(dayjs(), 'second') > 0
                            ? `Response due in 
                        ${dayjs(dayjs()).to(
                          dayjs(item.createdAt).add(48, 'hour'),
                          true
                        )}`
                            : 'Will respond shortly'}
                        </span>
                      </Fragment>
                    )}
                  </div>
                </div>
                <p className="grey truncate item">#{item._id}</p>
                <p className="capitalize item item-status">
                  <span>{item.status || '-'}</span>
                </p>
                <p className="item">
                  {item.assignedTo
                    ? item.assignedTo.firstName
                      ? item.assignedTo.firstName +
                          ' ' +
                          item.assignedTo.lastName || ''
                      : item.assignedTo.email
                    : 'Not assigned'}
                </p>
                <p
                  className="item"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  {item.current_status ? (
                    item.current_status.user === 'new_message' ? (
                      <Fragment>
                        <span className="truncate">New message </span>
                        <span className="circle green" />
                      </Fragment>
                    ) : item.current_status.user === 'awaiting' ? (
                      <Fragment>
                        <span className="truncate">Awaiting Response</span>
                        <span className="circle yellow" />
                      </Fragment>
                    ) : item.current_status.user === 'reviewed' ? (
                      <Fragment>
                        <span className="truncate"> Reviewed </span>
                        <span className="circle grey" />
                      </Fragment>
                    ) : (
                      '-'
                    )
                  ) : (
                    '-'
                  )}
                </p>
              </ListItem>
            ))}
            {reviewData.total > reviewParams.limit && (
              <PaginationWrapper>
                <Button
                  btnType="secondary"
                  disabled={ReviewPage === 0}
                  onClick={() => handlePage('review', 'prev')}
                >
                  Previous
                </Button>
                <Button
                  btnType="secondary"
                  disabled={
                    ReviewPage + 1 >=
                    Math.ceil(reviewData.total / reviewData.limit)
                  }
                  onClick={() => handlePage('review', 'next')}
                >
                  Next
                </Button>
              </PaginationWrapper>
            )}
          </div>
        ) : (
          <div className="align-center" style={{ height: '50vh' }}>
            <h3>No review tickets found!</h3>
          </div>
        )}
      </Wrapper>
    </Fragment>
  )
}

export default ReviewList

const StyledDashHeader = styled.header`
  min-height: 175px;
  max-height: 175px;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e9f3;
  display: flex;
  flex-direction: column;
  .header-wrapper {
    min-height: 100px;
    margin: auto;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  p,
  h1 {
    margin: 0;
  }
  p {
    font-size: 1rem;
    display: flex;
    float: right;
    span {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`

const Wrapper = styled.div`
  margin: 1.5rem;
  flex: 1;
  .grey {
    color: rgba(52, 52, 52, 0.4);
  }
  h3 {
    font-size: 1.12rem;
    font-weight: 400;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    .count {
      display: flex;
      height: 30px;
      min-width: 30px;
      padding: 0.5rem;
      line-height: normal;
      background-color: #ffeea4;
      font-size: 0.7rem;
      color: ${({ theme }) => theme.colors.primary};
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      margin-left: 0.7rem;
    }
  }
`

const ListTitle = styled.div`
  display: grid;
  grid-template-columns: 35% 25% 10% 15% 15%;
  padding: 0.7rem 1rem;
  border-left: 4px solid transparent;
  p {
    font-size: 0.7rem;
    margin: 0 0.5rem;
    width: 100%;
    color: inherit;
  }
`

const ListItem = styled.div`
  display: grid;
  grid-template-columns: 35% 25% 10% 15% 15%;
  background-color: #f7f8fa;
  border-radius: 3px;
  border-left: 4px solid #f08438;
  height: 70px;
  align-items: center;
  padding: 0.7rem 1rem;
  cursor: pointer;
  transition: box-shadow ease-in-out 0.2s;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
  &:hover {
    box-shadow: 0px 0px 5px 1px #f9bd3f;
  }
  .circle {
    height: 6px;
    width: 6px;
    border-radius: 50%;
    display: block;
    background-color: #aaa;
    margin-left: 0.7rem;
  }
  .green {
    background-color: #1bcc38;
  }
  .yellow {
    background-color: #f9bd3f;
  }

  .item-status span {
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
    padding: 0.2rem 0.7rem;
    font-size: 0.8rem;
    border-radius: 3px;
    width: 75px;
    display: block;
    text-align: center;
  }
  .item {
    margin: 0 0.5rem;
  }
  .title {
    p {
      margin: 0;
    }
    .title-label {
      display: flex;
      align-items: center;
      color: rgba(52, 52, 52, 0.4);
      font-size: 0.7rem;
    }
    .divider {
      margin: 0 0.5rem;
      ::before {
        display: flex;
        content: '';
        width: 7px;
        height: 7px;
        background-color: rgba(52, 52, 52, 0.4);
        border-radius: 50%;
      }
    }
  }
`
const ModalWrapper = styled.div`
  max-width: 700px;
  height: 75vh;
  width: 100%;
  background-color: white;
  padding: 1.5rem;

  .title {
    h3 {
      letter-spacing: 1px;
    }
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(52, 52, 52, 0.1);
    margin-bottom: 1rem;

    .close-icon {
      cursor: pointer;
      &:hover {
        svg path {
          stroke: #343434;
        }
      }
    }
  }
  .search {
    border-bottom: 1px solid rgba(52, 52, 52, 0.1);
    margin-bottom: 1rem;
    padding-bottom: 1rem;
  }
  .list-wrapper {
    overflow-y: auto;
    height: 50vh;
    padding-bottom: 1rem;
  }
  .list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    margin-bottom: 1rem;
    border-bottom: 1px solid rgba(52, 52, 52, 0.1);
    padding-bottom: 1rem;
    .item {
      margin: 0.5rem;
      background-color: rgba(52, 52, 52, 0.1);
      padding: 0.4rem;
      border-radius: 6px;
      cursor: pointer;
      &:hover {
        background-color: ${({ theme }) => theme.shades.primary[4]};
      }

      img {
        width: 100%;
        margin: 0;
        border-radius: 6px;
      }
      p {
        text-align: center;
        font-size: 0.65rem;
        margin: 0;
        font-weight: bold;
      }
    }
  }
`
