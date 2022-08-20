import dayjs from 'dayjs'
import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Badge } from '../../styled/badge'
import { Button } from '../../styled/button'
import { Spinner } from '../../styled/loader'
import { TableList } from '../../styled/table'
import { getSubscriptionPayments } from '../../queries/mebershipQueries'

const Payments = () => {
  const [page, setPage] = useState(0)

  const { data, isLoading, isError } = getSubscriptionPayments(page)

  useEffect(() => {
    if (!data || data.items.length === 0) return
  }, [data])

  const handlePage = (type: 'next' | 'prev') => {
    type === 'next' && setPage((page) => page + 1)
    type === 'prev' && setPage((page) => page - 1)
  }

  return (
    <Fragment>
      <h2 style={{ margin: 0 }}>Payment History</h2>
      <p style={{ marginBottom: '2rem' }}>
        This section includes all your payment history, plans and the method of
        payment used .
      </p>
      {isLoading ? (
        <div className="flex-center">
          <Spinner size="2rem" type="primary" />
        </div>
      ) : data && !isError ? (
        <Fragment>
          {data.items && data.items.length > 0 ? (
            <Fragment>
              <TableList size="sm">
                <thead>
                  <tr>
                    <th style={{ width: 'auto' }}>ID</th>
                    <th style={{ width: '15%' }}>Plan</th>
                    <th style={{ width: '10%' }}>Amount</th>
                    <th style={{ width: '15%' }}>Status</th>
                    <th style={{ width: '18%' }}>Card</th>
                    <th style={{ width: '18%' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item: Record<string, any>, i: number) => (
                    <tr key={i}>
                      <td>{item.id}</td>
                      <td className="capitalize">{item.plan_name || '-'}</td>
                      <td>
                        ${item.amount || '0.00'}&nbsp;
                        {item.currency && item.currency}
                      </td>
                      <td className="capitalize">
                        {item.refunded ? (
                          <RefundWrapper>
                            <Badge type="ghost">Refunded</Badge>
                            <span className="redund-amt">
                              ${item.amount_refunded || '0.00'}&nbsp;refunded
                            </span>
                          </RefundWrapper>
                        ) : item.amount_refunded > 0 ? (
                          <RefundWrapper>
                            <Badge type="ghost">Partial Refund</Badge>
                            <span className="redund-amt">
                              ${item.amount_refunded}&nbsp;refunded
                            </span>
                          </RefundWrapper>
                        ) : (
                          <Badge
                            type={
                              item.status === 'succeeded'
                                ? 'success'
                                : item.status === 'cancelled'
                                ? 'ghost'
                                : item.status === 'failed'
                                ? 'danger'
                                : 'info'
                            }
                          >
                            {item.status}
                          </Badge>
                        )}
                      </td>
                      <td>
                        <PaymentCardWrapper>
                          {item.method.brand && item.method.brand}

                          <span className="dot" />
                          <span className="dot" />
                          <span className="dot" />
                          <span className="dot" />
                          <span className="dot" />
                          {item.method.last4}
                        </PaymentCardWrapper>
                      </td>
                      <td>{dayjs(item.date).format('DD MMM YYYY, hh:mm a')}</td>
                    </tr>
                  ))}
                </tbody>
              </TableList>
              <PaginationWrapper>
                <Button
                  btnType="secondary"
                  disabled={page === 0}
                  onClick={() => handlePage('prev')}
                >
                  Previous
                </Button>
                <Button
                  btnType="secondary"
                  disabled={!data.has_more}
                  onClick={() => handlePage('next')}
                >
                  Next
                </Button>
              </PaginationWrapper>
            </Fragment>
          ) : (
            <div className="flex-center">
              <h3>No payments!</h3>
            </div>
          )}
        </Fragment>
      ) : (
        <div className="flex-center">
          <h3>Failed to load payments!</h3>
        </div>
      )}
    </Fragment>
  )
}

export default Payments

const PaymentCardWrapper = styled.div`
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
const RefundWrapper = styled.div`
  display: block;
  align-items: center;
  .redund-amt {
    display: block;
    font-size: 0.7rem;
    margin-top: 0.3rem;
  }
`
const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  button {
    width: fit-content;
    padding: 0 1rem;
    margin: 0 1rem;
  }
`
