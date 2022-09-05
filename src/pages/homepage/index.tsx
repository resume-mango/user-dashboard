import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import DashPageHeader from '../../components/ui/dashPageHeader'
import { useAuth } from '../../contexts/authProvider'
import { useViewport } from '../../contexts/viewPort'
import { Spinner } from '../../styled/loader'
import InfoBoxes from './InfoBoxes'
import ResumeCoverLetter from './resumeCoverLetter'
import SmallCalender from './sm-calender'
import TaskBoard from './taskboard'

const Homepage = () => {
  const [dashType, setDashType] = useState<string | null>(null)
  const { user } = useAuth()
  const { width } = useViewport()
  const date = new Date()
  const hours = date.getHours()

  useEffect(() => {
    if (!user || !user.role) return
    const hasPerm = user.role.some((r: any) => ['pro', 'ceo'].includes(r))
    if (hasPerm) {
      setDashType('full-access')
    } else {
      setDashType('limited-access')
    }
  }, [user.role])

  return (
    <Fragment>
      <DashPageHeader
        name={
          hours < 12
            ? 'Good Morning'
            : hours < 18
            ? 'Good Afternoon'
            : 'Good Evening'
        }
        title={
          <Fragment>
            Hello&nbsp;
            <span>{user.firstName}</span>
          </Fragment>
        }
      ></DashPageHeader>

      {dashType === 'limited-access' ? (
        <ResumeCoverLetter freeUser />
      ) : dashType === 'full-access' ? (
        <Fragment>
          <GridWrapper
            style={
              width > 1200 ? { borderBottom: '1px solid #e2e9f3' } : undefined
            }
          >
            <div
              style={
                width > 1200 ? { borderRight: '1px solid #e2e9f3' } : undefined
              }
            >
              <InfoBoxes />
              <ResumeCoverLetter />
            </div>
            <div>
              <SmallCalender />
            </div>
          </GridWrapper>
          <GridWrapper>
            <div
              style={
                width > 1200 ? { borderRight: '1px solid #e2e9f3' } : undefined
              }
            >
              <TaskBoard />
            </div>
            <div></div>
          </GridWrapper>
        </Fragment>
      ) : (
        <div className="flex-center">
          <Spinner size="2rem" type="primary" />
        </div>
      )}
    </Fragment>
  )
}

export default Homepage

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 65% 35%;
  height: 100%;
  width: 100%;
  @media (max-width: 1200px) {
    grid-template-columns: 100%;
  }
`
