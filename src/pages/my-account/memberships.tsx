import dayjs from 'dayjs'
import React, { Fragment, useState } from 'react'
import { useQueryClient } from 'react-query'
import styled from 'styled-components'
import { useNotify } from '../../contexts/notify'
import { Badge } from '../../styled/badge'
import { Button } from '../../styled/button'
import { Spinner } from '../../styled/loader'
import {
  cancelSubscription,
  getSubscription,
} from '../../queries/mebershipQueries'
import Image from '../../public/images/items-in-box.png'
import { useHistory } from 'react-router-dom'
import { convertISOToUnixDate } from '../../helpers/date'
import ClockIcon from '../../components/svgs/clock'
import MembershipList from './membershipList'
import LinkArrowIcon from '../../components/svgs/linkArrow'
import { useAuth } from '../../contexts/authProvider'

const Memberships = () => {
  const [showMembershipList, setShowMembershipList] = useState(false)

  const history = useHistory()
  const { setToken } = useAuth()
  const { data, isLoading, isError } = getSubscription()

  const UnixExpireDate =
    (data && data.cancel_at && convertISOToUnixDate(data.cancel_at)) || null

  const showNextBilling =
    data &&
    ((UnixExpireDate &&
      UnixExpireDate > convertISOToUnixDate(data.current_period_end)) ||
      !UnixExpireDate)

  const queryClient = useQueryClient()

  const { setNotify } = useNotify()

  const cancelSub = cancelSubscription(setToken, setNotify, queryClient)

  return (
    <Fragment>
      {isError ? (
        <div className="flex-center">
          <h3>Failed to load membership!</h3>
        </div>
      ) : data ? (
        <Fragment>
          {showMembershipList ? (
            <MembershipList setShow={setShowMembershipList} />
          ) : (
            <Wrapper>
              {data._id && (
                <Fragment>
                  <HeadWrappper>
                    <div className="heading">
                      <h2>{data.name || 'Unknown'} Plan</h2>
                      <Badge
                        type={
                          data.status === 'active'
                            ? 'success'
                            : data.status === 'pending'
                            ? 'primary'
                            : 'ghost'
                        }
                      >
                        {data.status}
                      </Badge>
                      {data.cancel_at && (
                        <Badge type="ghost" style={{ marginLeft: '1rem' }}>
                          <ClockIcon style={{ marginRight: '.3rem' }} />
                          Cancels&nbsp;
                          {dayjs(data.cancel_at).format('MMM DD')}
                        </Badge>
                      )}
                    </div>
                    <div>
                      {!data.cancel_at &&
                        data.status !== 'cancel requested' &&
                        !data.ended_time && (
                          <Button
                            btnType="secondary"
                            size="sm"
                            disabled={cancelSub.isLoading}
                            onClick={() => cancelSub.mutate()}
                          >
                            {cancelSub.isLoading ? (
                              <Fragment>
                                Cancelling
                                <Spinner
                                  size="1rem"
                                  style={{ marginLeft: '1rem' }}
                                />
                              </Fragment>
                            ) : (
                              'Cancel Subscription'
                            )}
                          </Button>
                        )}
                    </div>
                  </HeadWrappper>
                  <HorizontalInfo>
                    <div className="info-item">
                      <p className="info-item-label">Started</p>
                      <p>
                        {data.create_time
                          ? dayjs(data.create_time).format('DD MMM YYYY')
                          : '-'}
                      </p>
                    </div>
                    {showNextBilling && (
                      <div className="info-item">
                        <p className="info-item-label">Next Billing Time</p>
                        <p>
                          {data.current_period_end
                            ? dayjs(data.current_period_end).format(
                                'DD MMM YYYY'
                              )
                            : '-'}
                        </p>
                      </div>
                    )}

                    {!data.ended_time && data.cancel_at && (
                      <div className="info-item">
                        <p className="info-item-label">Expires On</p>
                        <p>
                          {data.cancel_at
                            ? dayjs(data.cancel_at).format('DD MMM YYYY')
                            : '-'}
                        </p>
                      </div>
                    )}
                  </HorizontalInfo>
                  <SubHeading>
                    <h4>Subscription Details</h4>
                    <div>
                      <LinkWrapper onClick={() => setShowMembershipList(true)}>
                        View past memberships <LinkArrowIcon size="0.8rem" />
                      </LinkWrapper>
                    </div>
                  </SubHeading>
                  <SubDetails>
                    <div className="sub-item">
                      <p>ID</p>
                      <p className="sub-value">{data._id}</p>
                      <p>Plan Name</p>
                      <p className="sub-value">{data.name} Plan</p>
                      <p>Amount</p>
                      <p className="sub-value">
                        ${data.amount ? data.amount : '0.00'}&nbsp;
                        {data.currency && data.currency.toUpperCase()}
                      </p>
                    </div>

                    <div className="sub-item">
                      <p>Payment Method</p>
                      <p className="sub-value">
                        {data.payment_method &&
                        data.payment_method.brand &&
                        data.payment_method.last4 ? (
                          <PaymentCardWrapper>
                            {data.payment_method.brand}
                            <Fragment>
                              <span className="dot" />
                              <span className="dot" />
                              <span className="dot" />
                              <span className="dot" />
                              <span className="dot" />
                              {data.payment_method.last4}
                            </Fragment>
                          </PaymentCardWrapper>
                        ) : (
                          '-'
                        )}
                      </p>
                      <p>Created</p>
                      <p className="sub-value">
                        {data.create_time
                          ? dayjs(data.create_time).format('DD MMM YYYY')
                          : '-'}
                      </p>
                      <p>Current Period</p>
                      <p className="sub-value">
                        {data.current_period_start
                          ? dayjs(data.current_period_start).format(
                              'DD MMM YYYY'
                            )
                          : '-'}
                        &nbsp;&nbsp;to&nbsp;&nbsp;
                        {data.current_period_end
                          ? dayjs(data.current_period_end).format('DD MMM YYYY')
                          : '-'}
                      </p>
                    </div>
                  </SubDetails>
                  {data.upcoming_invoice && (
                    <Fragment>
                      <SubHeading>
                        <div>
                          <h4>Upcoming Invoice</h4>
                          <p>
                            This is a preview of the invoice that will be billed
                            on&nbsp;
                            {data.current_period_end
                              ? dayjs(data.current_period_end).format(
                                  'DD MMM YYYY'
                                )
                              : 'end of the period'}
                            . It may change if the subscription is updated.
                          </p>
                        </div>
                      </SubHeading>
                      <InvoiceTable>
                        <thead>
                          <tr>
                            <th style={{ width: 'auto' }}>Description</th>
                            <th style={{ width: '120px' }}>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.upcoming_invoice.data.map(
                            (item: Record<string, any>, i: number) => (
                              <tr key={i}>
                                <td>{item.description}</td>
                                <td
                                  className={`amount ${
                                    item.amount < 0 && 'negative'
                                  }`}
                                >
                                  <span className="currency-symbol">$</span>
                                  {Math.abs(item.amount)}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </InvoiceTable>
                      <InvoiceFooter>
                        <div className="container">
                          <p className="semibold">Subtotal</p>
                          <p
                            className={`semibold amount ${
                              data.upcoming_invoice.total < 0 && 'negative'
                            }`}
                          >
                            <span className="currency-symbol">$</span>
                            {data.upcoming_invoice.total || '0.00'}
                          </p>

                          <p className="semibold">Total </p>
                          <p
                            className={`semibold amount ${
                              data.upcoming_invoice.total < 0 && 'negative'
                            }`}
                          >
                            <span className="currency-symbol">$</span>
                            {data.upcoming_invoice.total || '0.00'}
                          </p>
                          {data.upcoming_invoice.amount_paid > 0 && (
                            <Fragment>
                              <p className="semibold">Amount Paid</p>

                              <p
                                className={`semibold amount ${
                                  data.upcoming_invoice.amount_paid < 0 &&
                                  'negative'
                                }`}
                              >
                                <span className="currency-symbol">$</span>
                                {data.upcoming_invoice.amount_paid || '0.00'}
                              </p>
                            </Fragment>
                          )}
                          <p className="semibold">Amount Due</p>
                          <p
                            className={`semibold amount ${
                              data.upcoming_invoice.amount_due < 0 && 'negative'
                            }`}
                          >
                            <span className="currency-symbol">$</span>
                            {data.upcoming_invoice.amount_due || '0.00'}
                          </p>
                        </div>
                      </InvoiceFooter>
                    </Fragment>
                  )}
                  {data.latest_invoice && (
                    <Fragment>
                      <SubHeading>
                        <div>
                          <h4>Latest Invoice</h4>
                        </div>
                        <div>
                          <LinkWrapper
                            onClick={() => history.push('/my-account/payments')}
                          >
                            View all payments <LinkArrowIcon size="0.8rem" />
                          </LinkWrapper>
                        </div>
                      </SubHeading>
                      <InvoiceTable>
                        <thead>
                          <tr>
                            <th style={{ width: 'auto' }}>ID</th>
                            <th style={{ width: '15%' }}>Status</th>
                            <th style={{ width: '15%' }}>Amount</th>
                            <th style={{ width: '15%' }}>Created</th>
                            <th style={{ width: '15%' }}></th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td>{data.latest_invoice.id || '-'}</td>
                            <td>
                              <Badge
                                type={
                                  data.latest_invoice.status === 'paid'
                                    ? 'success'
                                    : 'ghost'
                                }
                              >
                                {data.latest_invoice.status || 'unknown'}
                              </Badge>
                            </td>
                            <td>${data.latest_invoice.total || '0.00'}</td>
                            <td>
                              {(data.latest_invoice.created &&
                                dayjs(data.latest_invoice.created).format(
                                  'DD MMM YYYY'
                                )) ||
                                '-'}
                            </td>
                            <td>
                              {data.latest_invoice.hosted_invoice_url && (
                                <a
                                  className="link"
                                  href={data.latest_invoice.hosted_invoice_url}
                                >
                                  View Invoice
                                </a>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </InvoiceTable>
                    </Fragment>
                  )}
                </Fragment>
              )}
              <Fragment>
                {!isLoading && data && !data._id && (
                  <Fragment>
                    <PendingWrapper>
                      <SMImage>
                        <img src={Image} />
                      </SMImage>
                      <h3>No Active Plan</h3>
                      <p>Upgrade to unlock all features and more.</p>

                      <div className="action-wrapper">
                        <Button
                          btnType="primary"
                          onClick={() => history.push('/subscribe')}
                        >
                          Upgrade
                        </Button>
                        <Button
                          btnType="secondary"
                          onClick={() => setShowMembershipList(true)}
                          style={{
                            width: 'fit-content',
                            paddingRight: '0.7rem',
                            paddingLeft: '0.7rem',
                          }}
                        >
                          Previous Memberships
                        </Button>
                      </div>
                    </PendingWrapper>
                  </Fragment>
                )}
              </Fragment>
            </Wrapper>
          )}
        </Fragment>
      ) : isLoading ? (
        <div className="flex-center">
          <Spinner size="2rem" type="primary" />
        </div>
      ) : (
        <div className="flex-center">
          <h3>Failed to load memberships!</h3>
        </div>
      )}
      {/* {!isError && !isLoading && !data && (
        <GridWrapper>
          <ImageWrapper>
            <img src={Image} alt="items-in-box" />
          </ImageWrapper>
          <PlansWrapper>
            <h3>Plans and pricing</h3>
            <p>
              This section includes all the plans and pricing details. This
              section includes all the plans and pricing details
            </p>
            <ul>
              {options.map((option: string, i: number) => (
                <li key={i}>
                  <img src={CheckCircle} alt="check circle" />
                  {option}
                </li>
              ))}
            </ul>
            <Button
              btnType="primary"
              size="lg"
              onClick={() => history.push('/subscribe')}
            >
              Upgrade
            </Button>
          </PlansWrapper>
        </GridWrapper>
      )} */}
    </Fragment>
  )
}

export default Memberships

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ease-in-out 0.2s;
  cursor: pointer;
  width: 200px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-right: auto;
  svg {
    margin-left: 0.5rem;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    svg {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
`

const InvoiceTable = styled.table`
  margin-bottom: 1rem;
  thead {
    tr {
      border-top: unset;
    }
  }
  td,
  th {
    font-size: 0.875rem;
  }
  th {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
  }
  th,
  td {
    text-align: start;
    padding: 0.7rem 1.25rem;
  }
  .amount {
    font-weight: 600;
    color: #888;
    letter-spacing: 1.5px;
  }
  .negative:before {
    content: '-';
  }
  ${Badge} {
    min-width: 75px;
  }
`

const PendingWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h2,
  p {
    margin: 0;
  }

  .action-wrapper {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 400px;
  }
`

const InvoiceFooter = styled.div`
  border-bottom: 1px solid #e7e7e7;
  margin-bottom: 3rem;
  padding-bottom: 0.5rem;
  .container {
    margin-top: 0.5rem;
    display: grid;
    grid-template-columns: auto 100px;
    max-width: 300px;
    margin-left: auto;
    p {
      margin: 0 0 0.5rem;
    }
    .amount {
      font-size: 0.8rem;
    }
    .currency-symbol {
      margin-right: 2px;
    }
  }
`

const SMImage = styled.div`
  display: flex;
  align-items: center;
  width: 250px;
  height: 250px;
  margin-bottom: 2rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const Wrapper = styled.div`
  .sub-heading-wrapper {
    h4 {
      margin-bottom: 0;
    }
    p {
      margin-bottom: 1rem;
    }
  }
`
const SubHeading = styled.div`
  border-bottom: 1px solid #e7e7e7;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  h4,
  p {
    margin: 0 0 0.5rem;
  }
  a {
    margin-right: 2rem;
  }
`

const HorizontalInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 3rem;
  p {
    margin: 0;
    line-height: 1.7;
  }
  .info-item-label {
    margin-bottom: 0.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }
  .info-item {
    &:not(:last-child) {
      margin-right: 1rem;
      padding-right: 1rem;
      border-right: 1px solid #e7e7e7;
    }
  }
`
const SubDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  max-width: 1000px;
  margin-bottom: 4rem;
  .sub-item {
    display: grid;
    grid-template-columns: minmax(75px, 130px) auto;
    align-items: center;
    .sub-value {
      color: #878787;
      text-transform: capitalize;
    }
    p {
      line-height: 2.5;
      margin: 0;
    }
  }
`
const HeadWrappper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .heading {
    display: flex;
    align-items: center;
    padding-top: 1rem;

    h2 {
      margin-right: 1rem;
      margin-bottom: 0;
      text-transform: capitalize;
    }
    margin-bottom: 1rem;
  }
  button {
    margin-right: 2rem;
  }
`

const PaymentCardWrapper = styled.span`
  display: flex;
  align-items: center;
  text-transform: capitalize;

  .dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #777;
    margin-right: 2px;
    &:first-child {
      margin-left: 10px;
    }
    &:last-child {
      margin-right: 5px;
    }
  }
`
