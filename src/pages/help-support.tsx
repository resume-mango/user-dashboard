import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import HubspotForm from '../components/hubspotForm'
import DashPageHeader from '../components/ui/dashPageHeader'
import { Spinner } from '../styled/loader'

const HelpSupport = () => {
  const [formLoaded, setFormLoaded] = useState(false)

  const loader = (
    <div className="flex-center">
      <Spinner size="2rem" type="primary" />
    </div>
  )
  return (
    <Fragment>
      <DashPageHeader name="Support" title="Help & Support"></DashPageHeader>

      {!formLoaded && loader}

      <Wrapper className={!formLoaded ? 'hide' : ''}>
        <h3>Need Help ?</h3>
        <p>
          Contact us and a member of our team will reply to you within 48 hours!
        </p>
        {/* <div id="hubspotForm"></div> */}
        <HubspotForm
          form={{
            region: String(process.env.HUBSPOT_SUPPORT_REGION),
            portalId: String(process.env.HUBSPOT_SUPPORT_PORTAL_ID),
            formId: String(process.env.HUBSPOT_SUPPORT_FORM_ID),
            target: '#hubspotForm',
          }}
          formLoaded={formLoaded}
          setFormLoaded={setFormLoaded}
        />
      </Wrapper>
    </Fragment>
  )
}

export default HelpSupport

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 1.5rem;
  max-width: 800px;
  p {
    font-size: 1rem;
  }
  &.hide {
    opacity: 0;
    height: 0;
  }
`
