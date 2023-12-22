import React, { Fragment, ReactNode, useState } from "react"
import styled from "styled-components"
import { useViewport } from "../../contexts/viewPort"
import logoIcon from "../../public/logo/logo-icon.svg"
import logoText from "../../public/logo/text-brown.png"
import HamburgerIcon from "../svgs/hamburger"
import UpgradePlan from "../upcgradeModal"
import Sidebar from "./sidebar"

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(false)

  const { width } = useViewport()
  return (
    <Fragment>
      {showUpgrade && <UpgradePlan handleClose={() => setShowUpgrade(false)} />}
      <Sidebar
        mobile={width <= 1025}
        show={show}
        setShow={setShow}
        setShowUpgrade={setShowUpgrade}
      />
      <div>
        <Content id="main-section">
          {width <= 1025 && (
            <MobileNav>
              <a href={`${process.env.BASE_HOST}`}>
                <img
                  src={logoIcon}
                  alt="resume-mango-icon"
                  width={width > 480 ? "75px" : "60px"}
                />
                <img src={logoText} width={width > 480 ? "175px" : "150px"} />
              </a>
              <a onClick={() => setShow(!show)} style={{ marginRight: "1rem" }}>
                <HamburgerIcon size="1.5rem" color="rgba(52,52,52,1)" />
              </a>
            </MobileNav>
          )}
          {children}
        </Content>
      </div>
    </Fragment>
  )
}

export default DashboardLayout

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: 260px;
  min-height: 100vh;
  overflow-x: hidden;
  @media (max-width: 1025px) {
    margin-left: 0;
  }
`

const MobileNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.7rem;
  border-bottom: 1px solid #eee;
  box-shadow: 0px 0px 23px 1px #eee;
  a {
    display: inline-flex;
    align-items: center;
  }
`
