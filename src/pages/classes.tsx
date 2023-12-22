import React, { Fragment, useState } from "react"
import styled from "styled-components"
import BasicAccordian from "../components/accordian/BasicAccordian"
import HubspotForm from "../components/hubspotForm"
import ClassIcon from "../components/svgs/class"
import TickMarkIcon from "../components/svgs/tickMark"
import DashPageHeader from "../components/ui/dashPageHeader"
import { SK_Form_Input, SK_Form_Label, SK_Wrapper } from "../styled/loader"
import { Helmet } from "react-helmet"

const data = [
  {
    name: "Email Etiquette",
    content: [
      "How to avoid common email mistakes",
      " Learn the difference between professional and casual email etiquette",
      "The basic structure of a good email",
      "How to change your emails depending on your audience",
    ],
  },
  {
    name: "Build the perfect resume: how to land your dream job",
    content: [
      "The key sections that every recruiter is looking for",
      "Common mistakes made ",
      "A sample resume created by a HR professional with over 10 years experience in recruiting",
      "How to tailor your resume based on the industry you are applying to",
      "Should you include a picture and address on your resume?",
      "An open discussion",
    ],
  },
  {
    name: "Create a cover letter that gets you hired",
    content: [
      "The importance of a personalized cover letter ",
      "The basic structure of an awesome cover letter",
      "How to do research on the company you are applying to",
      "A sample cover letter created by a HR professional with over",
      "10 years experience in recruiting ",
    ],
  },
]

const Classes = () => {
  const [show, setShow] = useState(0)
  const [formLoaded, setFormLoaded] = useState(false)
  const loader = (
    <SK_Wrapper>
      {[...Array(4)].map((_val, i) => (
        <Fragment key={i}>
          <SK_Form_Label className="mb-1" />
          <SK_Form_Input className="mb-3" />
        </Fragment>
      ))}
    </SK_Wrapper>
  )
  return (
    <Fragment>
      <Helmet>
        <title>Classes - Career Mango App</title>
        <meta name="description" content="Career Mango Classes Page" />
      </Helmet>
      <DashPageHeader
        name="Become a better version of yourself"
        title="Signup for upcoming classes"
      ></DashPageHeader>
      <Wrapper>
        <LHSWrapper>
          <Fragment>
            {!formLoaded && loader}
            <HubspotForm
              form={{
                region: String(process.env.HUBSPOT_CLASS_REGION),
                portalId: String(process.env.HUBSPOT_CLASS_PORTAL_ID),
                formId: String(process.env.HUBSPOT_CLASS_FORM_ID),
                target: "#hubspotForm",
              }}
              formLoaded={formLoaded}
              setFormLoaded={setFormLoaded}
            />
          </Fragment>
        </LHSWrapper>

        <RHSWrapper>
          <div className="acc_wrapper">
            {data.map((item, i) => (
              <Fragment key={i}>
                <BasicAccordian
                  icon={<ClassIcon size="1.4rem" color="#4F4F4F" />}
                  title={item.name}
                  show={show === i}
                  onClick={() => (show === i ? setShow(-1) : setShow(i))}
                >
                  <BodyWrapper>
                    <p>This class will show you:</p>
                    {item.content &&
                      item.content.map((desc, i) => (
                        <ListWrapper key={i}>
                          <span>
                            <TickMarkIcon size="0.9rem" color="#4F4F4F" />
                          </span>
                          {desc}
                        </ListWrapper>
                      ))}
                  </BodyWrapper>
                </BasicAccordian>
              </Fragment>
            ))}
          </div>
        </RHSWrapper>
      </Wrapper>
    </Fragment>
  )
}

export default Classes

const Wrapper = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 45% 55%;
  background-color: rgba(226, 233, 243, 0.3);
`
const RHSWrapper = styled.div`
  padding: 2.5rem;
  .acc_wrapper {
    max-width: 600px;
  }
`
const LHSWrapper = styled.div`
  background-color: #fff;
  flex: 1;
  padding: 2.5rem;

  #hubspotForm,
  .loader-wrapper {
    max-width: 500px;
  }
`
const BodyWrapper = styled.div`
  padding: 0 2rem 1rem 3rem;
  width: 100%;
`
const ListWrapper = styled.p`
  display: flex;
  align-items: center;
  width: 100%;
  span {
    width: 20px;
    margin-right: 0.7rem;
    height: 20px;
    align-self: baseline;
    margin-top: 0.2rem;
  }
`
