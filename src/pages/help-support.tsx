import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import DashPageHeader from '../components/ui/dashPageHeader'
import { Spinner } from '../styled/loader'

export interface HubspotWindow extends Window {
  hbspt: any
  grecaptcha: any
}
declare let window: HubspotWindow

const HelpSupport = () => {
  const [sdkReady, setSdkReady] = useState(false)
  useEffect(() => {
    if (window !== undefined && !window.hbspt && !sdkReady) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://js.hsforms.net/forms/v2.js`
      script.id = 'hbspt-forms'
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      script.onerror = () => {
        return console.log('Hubspot SDK could not be loaded.')
      }
      document.body.appendChild(script)
    } else {
      setSdkReady(true)
    }
    return () => {
      const script = document.getElementById('hbspt-forms')
      if (script) script.remove()
      if (window.hbspt) delete window.hbspt
      setSdkReady(true)
    }
  }, [])

  useEffect(() => {
    if (!sdkReady) return
    if (window.hbspt) {
      try {
        window.hbspt.forms.create({
          region: process.env.HUBSPOT_REGION,
          portalId: process.env.HUBSPOT_PORTAL_ID,
          formId: process.env.HUBSPOT_FORM_ID,
          target: '#hubspotForm',
        })
      } catch (err) {
        console.error('Failed to render form')
      }
    }
  }, [sdkReady])

  return (
    <Fragment>
      <DashPageHeader name="Support" title="Help & Support"></DashPageHeader>
      {!sdkReady && (
        <div className="flex-center">
          <Spinner size="2rem" type="primary" />
        </div>
      )}
      <Wrapper className={!sdkReady ? 'hide' : ''}>
        <h3>Need Help ?</h3>
        <p>
          Contact us and a member of our team will reply to you within 48 hours!
        </p>
        <div id="hubspotForm"></div>
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
