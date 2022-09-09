import React, { Fragment, useEffect } from 'react'
import styled from 'styled-components'
import HeaderStepper from '../../../components/ui/headerStepper'
import { useResume } from '../../../contexts/resume'
import Previewer from '../preview'
import ResumeStepper from './resumeStepper'
import TemplateFormSekleton from '../../../components/ui/tempFormSekleton'
import { useFormContext } from 'react-hook-form'
import useExitPrompt from '../../../hooks/useExitPromt'
import RouterPrompt from '../../../components/routerPrompt'

const ResumeBuilder = ({ isLoading }: { isLoading: boolean }) => {
  const { data, step, setStep } = useResume()
  const { showExitPrompt, setShowExitPrompt } = useExitPrompt(false)

  const {
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useFormContext()

  const isErrorStep1 =
    errors.first_name ||
    errors.last_name ||
    errors.phone_number ||
    errors.email_address ||
    errors.address ||
    errors.designation
      ? true
      : false

  const isErrorStep2 = errors.about_info ? true : false

  const isErrorStep3 =
    errors.experience ||
    errors.education ||
    errors.skills ||
    errors.courses ||
    errors.internships ||
    errors.languages ||
    errors.references
      ? true
      : false

  const isValidStep1 =
    data.first_name && data.last_name && data.email_address && !isErrorStep1
      ? true
      : false

  const isValidStep2 = !isErrorStep2 ? true : false

  const isValidStep3 =
    (data.experience ||
      data.education ||
      data.skills ||
      data.courses ||
      data.internships ||
      data.languages ||
      data.references) &&
    !isErrorStep3
      ? true
      : false

  useEffect(() => {
    return () => setShowExitPrompt(false)
  }, [])

  useEffect(() => {
    if (isDirty || !isValid || isSubmitting) {
      setShowExitPrompt(true)
    } else {
      setShowExitPrompt(false)
    }
  }, [isDirty, isSubmitting, isValid])

  const paths = data && data.id ? [`/resumes/preview/${data.id}`] : []

  return (
    <Fragment>
      <RouterPrompt
        show={showExitPrompt}
        setShow={setShowExitPrompt}
        exludedPaths={paths}
      />
      <Wrapper>
        <HeaderStepper max={3} current={step} backRoute="/resumes">
          <HeaderStepper.Step
            name="Personal Info"
            isValid={isValidStep1}
            isError={isErrorStep1}
            onClick={() => setStep(1)}
          />
          <HeaderStepper.Step
            name="Tell us about yourself"
            isValid={isValidStep2}
            isError={isErrorStep2}
            onClick={() => setStep(2)}
          />
          <HeaderStepper.Step
            name="Additional Information"
            isValid={isValidStep3}
            isError={isErrorStep3}
            onClick={() => setStep(3)}
          />
        </HeaderStepper>

        <form id="resumeForm" style={{ overflow: 'hidden' }}>
          <LHS>
            {isLoading || !data ? (
              <TemplateFormSekleton />
            ) : (
              <ResumeStepper step={step} setStep={setStep} max={3} />
            )}
          </LHS>

          <RHS>
            <Previewer isDataLoading={isLoading} />
          </RHS>
        </form>
      </Wrapper>
    </Fragment>
  )
}

export default ResumeBuilder

const Wrapper = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 7rem;
`

const LHS = styled.div`
  height: 100%;
  width: 50%;
  margin-right: 50%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0;
  }
`
const RHS = styled.div`
  background-color: #f7f9fc;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  height: 100%;
  position: fixed;
  width: 50%;
  top: 0;
  bottom: 0;
  right: 0;
  overflow: scroll;
  padding-top: 7rem;
  @media (max-width: 1500px) {
    padding-bottom: 2rem;
    padding-top: 9rem;
  }
`
