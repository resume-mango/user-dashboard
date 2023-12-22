import React, { Fragment } from "react"
import styled from "styled-components"
import CalendarIcon from "../components/svgs/calendar"
import LocationIcon1 from "../components/svgs/location1"
import DashPageHeader from "../components/ui/dashPageHeader"
import Adobe from "../public/images/adobe.svg"
import { Helmet } from "react-helmet"

const JobSearch = () => {
  return (
    <Fragment>
      {" "}
      <Helmet>
        <title>Jobs - Career Mango App</title>
        <meta name="description" content="Career Mango Jobs Page" />
      </Helmet>
      <DashPageHeader
        name="Personalised jobs for you"
        title="Find your dream job"
      ></DashPageHeader>
      <GridWrapper>
        {[...Array(6)].map((item, i) => (
          <JobBlock key={i}>
            <JobTitle>
              <JobLogo>
                <img src={Adobe}></img>
              </JobLogo>
              <div>
                <h4>Product Manager</h4>
                <p>Adobe</p>
              </div>
            </JobTitle>
            <JobDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse a mauris ornare, scelerisque nulla sed, porttitor
              neque...
            </JobDescription>
            <JobFooter>
              <JobFooterItem>
                <div className="location-icon">
                  <LocationIcon1 size="1.1rem" color="#000" />
                </div>
                <div>
                  <p>Location</p>
                  <p className="dark">Canada</p>
                </div>
              </JobFooterItem>
              <JobFooterItem>
                <div className="calendar-icon">
                  <CalendarIcon size="0.9rem" color="#000" />
                </div>
                <div>
                  <p>Date posted</p>
                  <p className="dark">2022-04-05</p>
                </div>
              </JobFooterItem>
            </JobFooter>
          </JobBlock>
        ))}
      </GridWrapper>
    </Fragment>
  )
}

export default JobSearch

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
  padding: 1.5rem;
  max-width: 1100px;
`

const JobBlock = styled.div`
  display: block;
  padding: 1rem;
  border: 1px solid #e2e9f3;
  box-shadow: 4px 4px 24px rgba(0, 51, 129, 0.07);
  border-radius: 7px;
  p {
    font-size: 0.875rem;
    margin: 0;
    color: rgba(0, 0, 0, 0.6);

    &.dark {
      color: rgba(0, 0, 0, 1);
    }
  }
`
const JobTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1rem;
  h4 {
    margin: 0;
  }
`

const JobDescription = styled.p`
  padding-bottom: 0.7rem;
  border-bottom: 1px solid #e2e9f3;
`

const JobFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.7rem;
`
const JobLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`

const JobFooterItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  .location-icon {
    margin-right: 0.2rem;
    svg {
      margin-top: 0.15rem;
    }
  }
  .calendar-icon {
    margin-right: 0.5rem;
  }
`
