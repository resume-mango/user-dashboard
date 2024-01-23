import React, { Fragment, useEffect } from "react"
import styled from "styled-components"
import HeaderStepper from "../../../components/ui/headerStepper"
import { useCoverLetter } from "../../../contexts/coverLetter"
import CoverLetterStepper from "./coverLetterStepper"
import Previewer from "../preview"
import TemplateFormSekleton from "../../../components/ui/tempFormSekleton"
import { useFormContext } from "react-hook-form"
import RouterPrompt from "../../../components/routerPrompt"
import useExitPrompt from "../../../hooks/useExitPromt"
import { useAuth } from "../../../contexts/authProvider"

const CoverLetterBuilder = ({ isLoading }: { isLoading: boolean }) => {
  const { data, step, setStep, submitCoverletter, isSaving, submitSuccess } =
    useCoverLetter()
  const { showExitPrompt, setShowExitPrompt } = useExitPrompt(false)
  const { user } = useAuth()

  const {
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useFormContext()

  const isErrorStep1 =
    errors.first_name ||
    errors.last_name ||
    errors.phone_number ||
    errors.email_address ||
    errors.address ||
    errors.designation ||
    errors.company ||
    errors.hiring_manager
      ? true
      : false

  const isErrorStep2 = errors.description ? true : false

  const isValidStep1 =
    data.first_name && data.last_name && data.email_address && !isErrorStep1
      ? true
      : false

  const isValidStep2 = !isErrorStep2 ? true : false

  useEffect(() => {
    return () => {
      setShowExitPrompt(false)
    }
  }, [])

  useEffect(() => {
    if (isDirty || !isValid || isSubmitting) {
      setShowExitPrompt(true)
    } else {
      setShowExitPrompt(false)
    }
  }, [isDirty, isSubmitting, isValid])

  const paths = data && data.id ? [`/coverletters/preview/${data.id}`] : []
  const isFreeUser =
    user && user.role && !["ceo"].some((r) => user.role.includes(r))
  return (
    <Fragment>
      <RouterPrompt
        show={showExitPrompt}
        setShow={setShowExitPrompt}
        handleSaveAndExit={() => submitCoverletter(null, true)}
        isSaving={isSaving}
        isSaved={submitSuccess}
        exludedPaths={paths}
        hasErrors={isErrorStep1 || isErrorStep2}
      />

      <Wrapper>
        <HeaderStepper
          max={2}
          current={step}
          backRoute={`${isFreeUser ? "/" : "/coverletters"}`}
        >
          <HeaderStepper.Step
            name="Personal Info"
            isValid={isValidStep1}
            isError={isErrorStep1}
            onClick={() => setStep(1)}
          />
          <HeaderStepper.Step
            name="Letter Body"
            isValid={isValidStep2}
            isError={isErrorStep2}
            onClick={() => setStep(2)}
          />
        </HeaderStepper>

        <form id="coverLetterForm" style={{ overflow: "hidden" }}>
          <LHS>
            {isLoading || !data ? (
              <TemplateFormSekleton />
            ) : (
              <CoverLetterStepper step={step} setStep={setStep} max={2} />
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

export default CoverLetterBuilder

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
  overflow-y: scroll;
  padding-top: 7rem;
  @media (max-width: 1500px) {
    padding-bottom: 2rem;
    padding-top: 9rem;
  }
`
