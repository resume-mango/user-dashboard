import React, { Fragment } from 'react'
import styled from 'styled-components'
import CertificateIcon from '../../../../components/svgs/certificate'
import InternshipIcon from '../../../../components/svgs/internship'
import LanguagesIcon from '../../../../components/svgs/language'
import PlusIcon from '../../../../components/svgs/plus'
import ReferenceIcon from '../../../../components/svgs/reference'

const OtherSection = ({
  otherFields,
  setOtherFields,
}: {
  otherFields: Array<string>
  setOtherFields: (val: any) => void
}) => {
  return (
    <Fragment>
      <Wrapper>
        <Heading>
          <PlusIcon size="1.4rem" />
          <p>Add other sections</p>
        </Heading>
        <Grid>
          {!otherFields.includes('courses') && (
            <div
              onClick={() => setOtherFields([...otherFields, 'courses'])}
              data-test-id="add_courses"
            >
              <span>
                <CertificateIcon size="1.2rem" />
              </span>
              <p>Courses</p>
            </div>
          )}

          {!otherFields.includes('internships') && (
            <div
              onClick={() => setOtherFields([...otherFields, 'internships'])}
              data-test-id="add_internships"
            >
              <span>
                <InternshipIcon size="1.2rem" />
              </span>
              <p>Internships</p>
            </div>
          )}

          {!otherFields.includes('languages') && (
            <div
              onClick={() => setOtherFields([...otherFields, 'languages'])}
              data-test-id="add_languages"
            >
              <span>
                <LanguagesIcon size="1.2rem" />
              </span>
              <p>Languages</p>
            </div>
          )}

          {!otherFields.includes('references') && (
            <div
              onClick={() => setOtherFields([...otherFields, 'references'])}
              data-test-id="add_references"
            >
              <span>
                <ReferenceIcon size="1.2rem" />
              </span>
              <p>References</p>
            </div>
          )}
        </Grid>
      </Wrapper>
    </Fragment>
  )
}

export default OtherSection

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.8rem 1.5rem;
  width: 100%;
  background: #ffffff;
  box-shadow: 4px 1px 8px rgba(0, 50, 61, 0.08);
  border: 1px solid #f5f5f5;
  border-radius: 6px;
  margin-bottom: 1.5rem;
`

const Heading = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  p {
    font-size: 1.125rem;
    margin-left: 1.5rem;
  }
  svg {
    path {
      stroke: #343434;
    }
  }
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  max-width: 600px;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  div {
    display: flex;
    align-items: center;
    cursor: pointer;
    p {
      font-size: 1rem;
      margin: 0;
      transition: color 0.5s;
    }
    span {
      display: inline-flex;
      margin-right: 1rem;
      margin-top: 0.2rem;
      svg {
        path {
          fill: #343434;
          transition: fill 0.5s;
        }
      }
    }
    &:hover {
      p {
        color: ${({ theme }) => theme.colors.primary};
      }
      svg {
        path {
          fill: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }
`
