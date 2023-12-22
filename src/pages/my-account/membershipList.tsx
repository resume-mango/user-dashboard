import dayjs from "dayjs"
import React, { Fragment, useState } from "react"
import styled from "styled-components"
import { Button } from "../../styled/button"
import { Spinner } from "../../styled/loader"
import { TableList } from "../../styled/table"
import { getAllSubscriptions } from "../../queries/mebershipQueries"
import { Helmet } from "react-helmet"

interface IMembershipList {
  setShow: (_val: boolean) => void
}

const MembershipList = ({ setShow }: IMembershipList) => {
  const [page, setPage] = useState(0)

  const limit = 10
  const handlePage = (type: "next" | "prev") => {
    type === "next" && setPage((page) => page + 1)
    type === "prev" && setPage((page) => page - 1)
  }

  const params = {
    limit,
    page,
    // exclude_id,
  }

  const { data, isLoading, isError } = getAllSubscriptions(params)

  return (
    <Fragment>
      <Helmet>
        <title>Last Memberships - Career Mango App</title>
        <meta name="description" content="Career Mango Last Memberships Page" />
      </Helmet>
      {isError && !data ? (
        <div className="flex-center">
          <h3>Failed to load memberships!</h3>
        </div>
      ) : isLoading ? (
        <div className="flex-center">
          <Spinner size="2rem" type="primary" />
        </div>
      ) : data ? (
        <Fragment>
          <HeadingWrapper>
            <div>
              <h4>Last Memberships</h4>
              <p>List of all previosly subscribed membership plans.</p>
            </div>
            <div></div>
            <Button btnType="secondary" onClick={() => setShow(false)}>
              View Current Plan
            </Button>
          </HeadingWrapper>
          <Fragment>
            {data.items && data.items.length > 0 ? (
              <Fragment>
                <TableList size="sm" className="mb-4">
                  <thead>
                    <tr>
                      <th style={{ width: "25%" }}>ID</th>
                      <th style={{ width: "auto" }}>Plan Name</th>
                      <th style={{ width: "10%" }}>Amount</th>
                      <th style={{ width: "15%" }}>Status</th>
                      <th style={{ width: "15%" }}>Created</th>
                      <th style={{ width: "15%" }}>Ended</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items.map((sub: Record<string, any>, i: number) => (
                      <tr key={i}>
                        <td>{sub._id}</td>
                        <td className="capitalize">
                          {sub.name || "Unknown"} plan
                        </td>
                        <td>
                          ${sub.amount || "0.00"}&nbsp;
                          {sub.currency && sub.currency.toUpperCase()}
                        </td>
                        <td className="capitalize">{sub.status || "-"}</td>
                        <td>
                          {sub.create_time
                            ? dayjs(sub.create_time).format("DD MMM YYYY")
                            : "-"}
                        </td>
                        <td>
                          {sub.ended_time
                            ? dayjs(sub.ended_time).format("DD MMM YYYY")
                            : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </TableList>
                <PaginationWrapper>
                  <Button
                    btnType="secondary"
                    disabled={page === 0}
                    onClick={() => handlePage("prev")}
                  >
                    Previous
                  </Button>
                  <Button
                    btnType="secondary"
                    disabled={page + 1 >= Math.ceil(data.total / data.limit)}
                    onClick={() => handlePage("next")}
                  >
                    Next
                  </Button>
                </PaginationWrapper>
              </Fragment>
            ) : (
              <div className="flex-center" style={{ height: "150px" }}>
                <h3>No past memberships!</h3>
              </div>
            )}
          </Fragment>
        </Fragment>
      ) : null}
    </Fragment>
  )
}

export default MembershipList

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
const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  h4 {
    margin-bottom: 0.5rem;
  }
  p {
    margin: 0;
  }
`
