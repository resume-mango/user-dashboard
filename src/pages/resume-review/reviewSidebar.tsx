import dayjs from "dayjs"
import React, { Fragment, useState } from "react"
import styled from "styled-components"
import DownArrowIcon from "../../components/svgs/downArrow"
import WarningIcon from "../../components/svgs/warning"
import logoIcon from "../../public/logo/logo-icon.svg"
import logoText from "../../public/logo/resume-mango-full-logo-white-letters.png"
import { SK_Heading, SK_Text, SK_Wrapper } from "../../styled/loader"
import { useHistory } from "react-router-dom"
import { Button } from "../../styled/button"

const ReviewAccordian = ({
  data,
  handleShowResume,
}: {
  data: Record<string, any>
  handleShowResume: (_show: boolean) => void
}) => {
  const [show, setShow] = useState({
    ticket: true,
    customer: true,
    resume: true,
  })
  return (
    <AccordianWrapper>
      <div>
        <Accordian show={show.ticket}>
          <div
            className="head-wrapper"
            onClick={() => setShow({ ...show, ticket: !show.ticket })}
          >
            <p className="acc_heading">Ticket Info</p>
            <span>
              <DownArrowIcon size=".8rem" />
            </span>
          </div>
          <div className="item-wrapper">
            <div className="item">
              <p className="item-label">Ticket ID</p>
              <p>{(data && data._id) || "-"}</p>
            </div>
            <div className="item">
              <p className="item-label">Status</p>
              <p className="capitalize">{(data && data.status) || "-"}</p>
            </div>
          </div>
        </Accordian>
        <Accordian show={show.customer}>
          <div
            className="head-wrapper"
            onClick={() => setShow({ ...show, customer: !show.customer })}
          >
            <p className="acc_heading">Reviewer Info</p>
            <span>
              <DownArrowIcon size=".8rem" />
            </span>
          </div>
          <div className="item-wrapper">
            <div className="item">
              <p className="item-label">Reviewer </p>
              <p>
                {(data &&
                  data.assignedTo &&
                  data.assignedTo.firstName &&
                  (data.assignedTo.firstName + " " + data.assignedTo.lastName ||
                    "")) ||
                  "-"}
              </p>
            </div>
          </div>
        </Accordian>
      </div>
      <div>
        <Accordian show={show.resume}>
          <div
            className="head-wrapper"
            onClick={() => setShow({ ...show, resume: !show.resume })}
          >
            <p className="acc_heading">Resume Info</p>
            <span>
              <DownArrowIcon size=".8rem" />
            </span>
          </div>
          <div className="item-wrapper">
            <div className="item">
              <p className="item-label">Name</p>
              <p>{(data && data.resume && data.resume.title) || "-"}</p>
            </div>
            <div className="item">
              <p className="item-label">Date Created</p>
              <p>
                {(data &&
                  data.createdAt &&
                  dayjs(data.createdAt).format("DD/MM/YYYY")) ||
                  "-"}
              </p>
            </div>
            <div className="item">
              <p className="item-label">Resume Link</p>
              {(data && data.resume && (
                <Fragment>
                  <p>
                    <a
                      data-test-id="toggle-resume"
                      onClick={() => handleShowResume(true)}
                    >
                      View Resume
                    </a>
                  </p>
                  <p></p>
                </Fragment>
              )) ||
                "-"}
            </div>
          </div>
        </Accordian>
      </div>
    </AccordianWrapper>
  )
}

const ReviewSidebar = ({
  data,
  isLoading,
  isError,
  handleShowResume,
}: {
  data: Record<string, any>
  isLoading: boolean
  isError: boolean
  handleShowResume: (_show: boolean) => void
}) => {
  const history = useHistory()
  return (
    <Fragment>
      <NavWrapper className="hide-scrollbar">
        <NavBrand>
          <LogoWrapper>
            <a href={`${process.env.BASE_HOST}`}>
              <img src={logoIcon} width="75px" />
              <img src={logoText} width="125px" />
            </a>
          </LogoWrapper>
          <p>All-in-one job hunting platform</p>
          <Button
            btnType="primary"
            size="sm"
            onClick={() => history.push("/resumes/new")}
          >
            Create Resume
          </Button>
        </NavBrand>
        <NavLinksWrapper data-test-id="resume-links">
          {isError ? (
            <div className="align-center">
              <WarningIcon size="2rem" />
              <p style={{ marginLeft: "0.5rem" }}>
                Failed to load ticket details!
              </p>
            </div>
          ) : isLoading ? (
            <div style={{ padding: "2.5rem", height: "100%" }}>
              <AccordianWrapper>
                <SK_Wrapper>
                  <SK_Heading className="mb-1" />
                  <SK_Text className="mb" />
                  <SK_Text className="mb" />
                  <SK_Text className="mb" />
                  <SK_Text style={{ marginBottom: "1rem" }} />
                  <SK_Heading className="mb-1" />
                  <SK_Text style={{ marginBottom: "5rem" }} />
                </SK_Wrapper>
                <SK_Wrapper>
                  <SK_Heading className="mb-1" />
                  <SK_Text className="mb" />
                  <SK_Text className="mb" />
                </SK_Wrapper>
              </AccordianWrapper>
            </div>
          ) : (
            <ReviewAccordian data={data} handleShowResume={handleShowResume} />
          )}
        </NavLinksWrapper>
      </NavWrapper>
    </Fragment>
  )
}

export default ReviewSidebar
const AccordianWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`
const Accordian = styled.div<{ show: boolean }>`
  .item-wrapper,
  .head-wrapper {
    padding: 0 2.5rem;
  }
  .head-wrapper {
    background: rgba(240, 132, 56, 0.05);
    height: 40px;
    color: ${({ theme }) => theme.colors.primary};
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-right: 3px solid ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
    cursor: pointer;
    p {
      font-size: 0.875rem;
      margin: 0;
      padding: 0;
    }
    svg {
      transition: all ease-in-out 0.5s;
      transform: ${({ show }) =>
        show ? "rotateZ(360deg)" : "rotateZ(180deg)"};
      path {
        stroke: ${({ theme }) => theme.colors.primary};
        stroke-width: 2;
      }
    }
  }
  .item-wrapper {
    transition: all ease-in-out 0.5s;
    height: 100%;
    max-height: ${({ show }) => (show ? "1000px" : "0px")};
    opacity: ${({ show }) => (show ? 1 : 0)};
    visibility: ${({ show }) => (show ? "visible" : "hidden")};

    overflow: hidden;
    p {
      margin: 0.3rem 0;
    }
    a {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: underline;
    }
    .item {
      margin-bottom: 1rem;
    }
    .item-label {
      font-size: 0.75rem;
      color: rgba(52, 52, 52, 0.5);
    }
  }
`

const NavWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform ease-in-out 500ms;
  max-width: 260px;
  overflow: auto;
  position: fixed;
  z-index: 2;
  border-right: 1px solid #eee;
`

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`
const NavBrand = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 260px;
  min-height: 175px;
  max-height: 175px;
  background: #0f102a;
  @media (max-height: 800px) {
    height: auto;
  }

  p {
    color: #bababa;
    margin-top: 0;
    font-size: 14px;
  }
`
const NavLinksWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  width: 100%;
  flex: 1;
  background: #f7f8fa;
  padding: 2.5rem 0;
`
