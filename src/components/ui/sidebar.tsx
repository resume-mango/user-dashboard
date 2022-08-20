import React, { Fragment, useEffect, useState } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import logoText from '../../public/logo/resume-mango-full-logo-white-letters.png'
import logoIcon from '../../public/logo/resume-mango-logo.png'
import { Button } from '../../styled/button'
import DashboardIcon from '../svgs/Dashboard'
// import BoxIcon from '../svgs/boxIcon'
// import DegreeHatIcon from '../svgs/degreeHatIcon'
// import BulbIcon from '../svgs/bulbIcon'
// import SearchIcon from '../svgs/searchIcon'
import BreifCaseIcon from '../svgs/breifCaseIcon'
import ResumeIcon from '../svgs/resumeIcon'
import TaskIcon from '../svgs/taskIcon'
import UserIcon from '../svgs/userIcon'
import QuestionIcon from '../svgs/questionIcon'
import LogoutIcon from '../svgs/logoutIcon'
import dayjs from 'dayjs'
import TrackerIcon from '../svgs/tracker'
import ClipboardClockIcon from '../svgs/clipoardClock'
import LockIcon from '../svgs/lock'
import { useAuth } from '../../contexts/authProvider'

const Sidebar = ({
  mobile,
  show,
  setShow,
  setShowUpgrade,
}: {
  mobile: boolean
  show: boolean
  setShow: (val: boolean) => any
  setShowUpgrade: (val: boolean) => any
}) => {
  const history = useHistory()
  return (
    <Fragment>
      <NavWrapper show={show} mobile={mobile} className="hide-scrollbar">
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
            onClick={() => history.push('/resumes/new')}
          >
            Create Resume
          </Button>
        </NavBrand>
        <Navlinks setShow={setShow} setShowUpgrade={setShowUpgrade} />
      </NavWrapper>
    </Fragment>
  )
}

const Navlinks = ({
  setShow,
  setShowUpgrade,
}: {
  setShow: (val: boolean) => any
  setShowUpgrade: (val: boolean) => any
}) => {
  const today = dayjs().format('YYYY/MM/DD')
  const { user } = useAuth()
  const history = useHistory()
  const handleLogout = () => {
    window.location.href = `${process.env.AUTH_HOST}/auth/logout`
  }
  const location = useLocation()

  const [showLock, setShowLock] = useState(false)
  const [active, setActive] = useState('/')
  useEffect(() => {
    user &&
    user.role &&
    Array.isArray(user.role) &&
    user.role.some((r) => ['standard', 'premium'].includes(r))
      ? setShowLock(false)
      : setShowLock(true)
  }, [user.role])

  const handleNav = (link: string, protect?: boolean) => {
    if (protect) {
      showLock ? setShowUpgrade(true) : history.push(link)
    } else {
      history.push(link)
    }
    setShow(false)
    return
  }

  useEffect(() => {
    const path = location.pathname.split('/')[1]
    setActive(path ? path : '/')
  }, [location.pathname])

  return (
    <NavLinksWrapper>
      <div>
        <h6>MENU</h6>
        <ul>
          <li>
            <a
              onClick={() => handleNav('/')}
              className={active === '/' ? 'active' : ''}
            >
              <div className="link-wrapper">
                <DashboardIcon size="1.1rem" /> Dashboard
              </div>
            </a>
          </li>
          <li>
            <a
              onClick={() => handleNav('/progress-tracker', true)}
              className={active === 'progress-tracker' ? 'active' : ''}
            >
              <div className="link-wrapper">
                <TrackerIcon size="1.2rem" className="stroke-icon" /> Progress
                Tracker
              </div>
              {showLock && <LockIcon size="1.1rem" />}
            </a>
          </li>
          <li>
            <a
              onClick={() => handleNav(`/calendar/view/${today}`, true)}
              className={active === 'calendar' ? 'active' : ''}
            >
              <div className="link-wrapper">
                <TaskIcon size="1.1rem" /> Calendar
              </div>
              {showLock && <LockIcon size="1.1rem" />}
            </a>
          </li>
          <li>
            <a
              onClick={() => handleNav('/resumes', true)}
              className={active === 'resumes' ? 'active' : ''}
            >
              <div className="link-wrapper">
                <ResumeIcon size="1.1rem" style={{ marginTop: '0.3rem' }} />
                Resumes
              </div>
              {showLock && <LockIcon size="1.1rem" />}
            </a>
          </li>
          <li>
            <a
              onClick={() => handleNav('/coverletters', true)}
              className={active === 'coverletters' ? 'active' : ''}
            >
              <div className="link-wrapper">
                <BreifCaseIcon size="1.1rem" /> Cover letters
              </div>
              {showLock && <LockIcon size="1.1rem" />}
            </a>
          </li>
        </ul>
        <h6 style={{ marginTop: '1.5rem' }}>COMING SOON</h6>
        <ul>
          <li>
            <a
              onClick={() => handleNav('/resources')}
              className={active === 'resources' ? 'active' : ''}
            >
              <div className="link-wrapper">
                <ClipboardClockIcon size="1.3rem" /> Resources
              </div>
            </a>
          </li>
          <li>
            <a
              onClick={() => handleNav('/job-search')}
              className={active === 'job-search' ? 'active' : ''}
            >
              <div className="link-wrapper">
                <ClipboardClockIcon size="1.3rem" /> Jobs search
              </div>
            </a>
          </li>
          <li>
            <a
              onClick={() => handleNav('/interviews')}
              className={active === 'interviews' ? 'active' : ''}
            >
              <div className="link-wrapper">
                <ClipboardClockIcon size="1.3rem" /> Simulated Interviews
              </div>
            </a>
          </li>

          {/* <li>
            <a to="/tips-tricks" onClick={() => handleNav(false)}>
              <BulbIcon size="1.2rem" /> Tips and tricks
            </a>
          </li> */}

          <li>
            <a
              onClick={() => handleNav('/classes')}
              className={active === 'classes' ? 'active' : ''}
            >
              <div className="link-wrapper">
                <ClipboardClockIcon size="1.3rem" /> Classes
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        <h6>YOUR ACCOUNT</h6>
        <ul>
          <li>
            <a
              onClick={() => handleNav('/my-account')}
              className={active === 'my-account' ? 'active' : ''}
            >
              <div className="link-wrapper">
                <UserIcon size="1rem" /> My account
              </div>
            </a>
          </li>
          <li>
            <a
              onClick={() => handleNav('/support')}
              className={active === 'support' ? 'active' : ''}
            >
              <div className="link-wrapper">
                <QuestionIcon size="1.1rem" /> Help and support
              </div>
            </a>
          </li>
          <li>
            <a onClick={() => handleLogout()}>
              <div className="link-wrapper">
                <LogoutIcon size="1.1rem" /> Logout
              </div>
            </a>
          </li>
        </ul>
      </div>
    </NavLinksWrapper>
  )
}

export default Sidebar
const NavWrapper = styled.div<{ mobile: boolean; show: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;

  flex-direction: column;
  transition: transform ease-in-out 500ms;
  max-width: 260px;
  overflow: auto;
  position: fixed;
  z-index: 2;
  @media (max-width: 900px) {
    transform: ${({ show }) =>
      !show ? 'translateX(-300px)' : 'translateX(0)'};
  }
`
const NavLinksWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  width: 100%;
  background: #f7f8fa;
  padding: 2.5rem 0;
  flex: 1;
  h6 {
    font-size: 12px;
    color: #b4b4b4;
    padding: 0 1.5rem;
  }
  ul {
    li {
      a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: all ease-in-out 300ms;
        padding: 0.875rem 1.5rem;
        &.active {
          color: #f08438;
          background: rgba(240, 132, 56, 0.05);
          border-right: 4px solid #f08438;
          svg {
            path {
              fill: #f08438;
            }
          }
          .stroke-icon {
            path {
              stroke: #f08438;
            }
          }
        }

        .link-wrapper {
          display: flex;
          align-items: center;
        }

        svg {
          display: inline-flex;
          margin-right: 1.1rem;
          path {
            transition: all ease-in-out 300ms;
          }
        }
      }
      &:hover {
        a {
          color: #f08438;
        }
        svg {
          path {
            fill: #f08438;
          }
        }
        .stroke-icon {
          path {
            stroke: #f08438;
          }
        }
      }
    }
  }
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
