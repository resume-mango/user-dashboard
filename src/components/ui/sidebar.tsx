import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import logoIcon from "../../public/logo/logo-white.svg";
import { Button } from "../../styled/button";
import DashboardIcon from "../svgs/Dashboard";
import BreifCaseIcon from "../svgs/breifCaseIcon";
import ResumeIcon from "../svgs/resumeIcon";
import TaskIcon from "../svgs/taskIcon";
import UserIcon from "../svgs/userIcon";
import QuestionIcon from "../svgs/questionIcon";
import LogoutIcon from "../svgs/logoutIcon";
import dayjs from "dayjs";
import TrackerIcon from "../svgs/tracker";
import LockIcon from "../svgs/lock";
import { useAuth } from "../../contexts/authProvider";
import BulbIcon from "../svgs/bulbIcon";
import { getUnreadChats } from "../../queries/chatQueries";

const Sidebar = ({
  mobile,
  show,
  setShow,
  setShowUpgrade,
}: {
  mobile: boolean;
  show: boolean;
  setShow: (val: boolean) => any;
  setShowUpgrade: (val: boolean) => any;
}) => {
  const history = useHistory();
  return (
    <Fragment>
      <NavWrapper show={show} mobile={mobile} className="hide-scrollbar">
        <NavBrand>
          <LogoWrapper>
            <a href={`${process.env.BASE_HOST}`}>
              <img src={logoIcon} width="175" />
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
        <Navlinks setShow={setShow} setShowUpgrade={setShowUpgrade} />
      </NavWrapper>
    </Fragment>
  );
};

const Navlinks = ({
  setShow,
  setShowUpgrade,
}: {
  setShow: (val: boolean) => any;
  setShowUpgrade: (val: boolean) => any;
}) => {
  const today = dayjs().format("YYYY/MM/DD");
  const { user } = useAuth();
  const history = useHistory();
  const handleLogout = () => {
    window.location.href = `${process.env.AUTH_HOST}/logout`;
  };

  const { data: unread } = getUnreadChats();

  const location = useLocation();

  const [active, setActive] = useState("/");

  const ceoUser = user && user.role && user.role.includes("ceo");

  const handleNav = (link: string, role?: string[]) => {
    if (role && role.length > 0) {
      if (!user || !user.role) return;
      const hasPerm = user.role.some((r: string) => role.includes(r));
      !hasPerm ? setShowUpgrade(true) : history.push(link);
    } else {
      history.push(link);
    }
    setShow(false);
    return;
  };

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setActive(path ? path : "/");
  }, [location.pathname]);

  return (
    <NavLinksWrapper>
      <div>
        <h6>MENU</h6>
        <ul>
          <li>
            <a
              onClick={() => handleNav("/")}
              className={active === "/" ? "active" : ""}
            >
              <div className="link-wrapper">
                <DashboardIcon size="1.1rem" /> Dashboard
              </div>
            </a>
          </li>
          <li>
            <a
              onClick={() => handleNav("/resumes")}
              className={active === "resumes" ? "active" : ""}
            >
              <div className="link-wrapper">
                <ResumeIcon size="1.1rem" style={{ marginTop: "0.3rem" }} />
                Resumes
              </div>
            </a>
          </li>
          <li>
            <a
              onClick={() => handleNav("/coverletters")}
              className={active === "coverletters" ? "active" : ""}
            >
              <div className="link-wrapper">
                <BreifCaseIcon size="1.1rem" /> Cover letters
              </div>
            </a>
          </li>
          <li>
            <a
              onClick={() => handleNav("/progress-tracker", ["ceo"])}
              className={active === "progress-tracker" ? "active" : ""}
            >
              <div className="link-wrapper">
                <TrackerIcon size="1.2rem" className="stroke-icon" /> Progress
                Tracker
              </div>
              {!ceoUser && <LockIcon size="1.1rem" />}
            </a>
          </li>
          <li>
            <a
              onClick={() => handleNav(`/calendar/view/${today}`, ["ceo"])}
              className={active === "calendar" ? "active" : ""}
            >
              <div className="link-wrapper">
                <TaskIcon size="1.1rem" /> Calendar
              </div>
              {!ceoUser && <LockIcon size="1.1rem" />}
            </a>
          </li>

          {/* <li>
            <a
              onClick={() => handleNav("/classes")}
              className={active === "classes" ? "active" : ""}
            >
              <div className="link-wrapper">
                <DegreeHatIcon size="1.3rem" /> Classes
              </div>
              {!proUser && !ceoUser && <LockIcon size="1.1rem" />}
            </a>
          </li> */}
          <li>
            <a
              onClick={() => handleNav("/resume-review", ["ceo"])}
              className={active === "resume-review" ? "active" : ""}
            >
              <div className="link-wrapper">
                <BulbIcon size="1.2rem" /> Resume Review
              </div>
              {!ceoUser ? (
                <LockIcon size="1.1rem" />
              ) : unread && unread.count ? (
                <Counter>{unread.count}</Counter>
              ) : null}
            </a>
          </li>
        </ul>
        {/* <h6 style={{ marginTop: "1.5rem" }}>COMING SOON</h6>
        <ul>
          <li>
            <a
              onClick={() => handleNav("/resources")}
              className={active === "resources" ? "active" : ""}
            >
              <div className="link-wrapper">
                <ClipboardClockIcon size="1.3rem" /> Resources
              </div>
            </a>
          </li>
          <li>
            <a
              onClick={() => handleNav("/job-search")}
              className={active === "job-search" ? "active" : ""}
            >
              <div className="link-wrapper">
                <ClipboardClockIcon size="1.3rem" /> Jobs search
              </div>
            </a>
          </li>
          <li>
            <a
              onClick={() => handleNav("/interviews")}
              className={active === "interviews" ? "active" : ""}
            >
              <div className="link-wrapper">
                <ClipboardClockIcon size="1.3rem" /> Simulated Interviews
              </div>
            </a>
          </li>

          <li>
            <a to="/tips-tricks" onClick={() => handleNav(false)}>
              <BulbIcon size="1.2rem" /> Tips and tricks
            </a>
          </li>
        </ul> */}
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        <h6>YOUR ACCOUNT</h6>
        <ul>
          <li>
            <a
              onClick={() => handleNav("/my-account")}
              className={active === "my-account" ? "active" : ""}
            >
              <div className="link-wrapper">
                <UserIcon size="1rem" /> My account
              </div>
            </a>
          </li>
          <li>
            <a
              onClick={() => handleNav("/support")}
              className={active === "support" ? "active" : ""}
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
  );
};

export default Sidebar;
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
  @media (max-width: 1025px) {
    transform: ${({ show }) =>
      !show ? "translateX(-300px)" : "translateX(0)"};
  }
`;
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
`;
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
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
`;
const Counter = styled.div`
  display: flex;
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 0.7rem;
  color: #fff;
  border-radius: 50%;
  line-height: 1;
  align-items: center;
  justify-content: center;
`;
