import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export interface HubspotWindow extends Window {
  hbspt: any
  grecaptcha: any
}
declare let window: HubspotWindow

interface IHbsptFrom {
  region: string
  portalId: string
  formId: string
  target: string
}

interface IProps {
  id?: string
  form: IHbsptFrom
  formLoaded: boolean
  setFormLoaded: (_val: boolean) => void
}

const HubspotForm: React.FC<IProps> = ({
  id,
  form,
  formLoaded,
  setFormLoaded,
}) => {
  const [sdkReady, setSdkReady] = useState(false)

  useEffect(() => {
    if (window !== undefined && !window.hbspt && !sdkReady) {
      setFormLoaded(false)
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
    let timer: any
    if (window.hbspt) {
      try {
        window.hbspt.forms.create({
          region: form.region,
          portalId: form.portalId,
          formId: form.formId,
          target: form.target,
        })
        timer = setTimeout(() => {
          setFormLoaded(true)
        }, 1000)
      } catch (err) {
        console.error('Failed to render form')
      }
    }
    return () => {
      timer && clearTimeout(timer)
    }
  }, [sdkReady])

  return (
    <Wrapper
      id={id ? id : 'hubspotForm'}
      className={!sdkReady || !formLoaded ? 'hide' : ''}
    ></Wrapper>
  )
}

export default HubspotForm

const Wrapper = styled.div`
  &.hide {
    opacity: 0;
    height: 0;
  }
`
