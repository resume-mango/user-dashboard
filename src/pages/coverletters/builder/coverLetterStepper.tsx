import React, { Fragment, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'
import styled, { keyframes } from 'styled-components'
import CheckIcon1 from '../../../components/svgs/check1'
import { useCoverLetter } from '../../../contexts/coverLetter'
import { useViewport } from '../../../contexts/viewPort'
import { Button } from '../../../styled/button'
import { Spinner } from '../../../styled/loader'
import { FormButtonWrapper } from '../../../styled/form'
import Step1 from './step1'
import Step2 from './step2'
import WarningIcon from '../../../components/svgs/warning'

interface IProps {
  step: number
  setStep: (val: any) => void
  max: number
}

const CoverLetterStepper: React.FC<IProps> = ({ step, setStep, max }) => {
  const [submit, setSubmit] = useState(false)

  const { submitCoverletter, submitSuccess } = useCoverLetter()
  const { width } = useViewport()
  const btnSize = width > 1300 ? 'lg' : 'sm'
  const {
    formState: { isSubmitting, isDirty, isValid },
  } = useFormContext()

  const handleNext = () => {
    step < max && setStep((prev: number) => prev + 1)
    return setSubmit(true)
  }

  const handlePrev = () => {
    return step > 1 && setStep((prev: number) => prev - 1)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (submit) {
        if (isDirty) {
          submitCoverletter(null, step === 2)
        }
        setSubmit(false)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [submit])

  return (
    <Fragment>
      <Wrapper>
        {step === 1 ? <Step1 /> : step === 2 ? <Step2 /> : null}

        <FormButtonWrapper>
          <Button
            type="button"
            btnType="ghost"
            size={btnSize}
            color="#343434"
            onClick={() => handlePrev()}
            data-test-id="cancel-prev-btn"
            style={{ marginRight: '1rem' }}
          >
            {step === 1 ? 'Cancel' : 'Previous'}
          </Button>
          <Button
            type="button"
            btnType="primary"
            size={btnSize}
            onClick={() => handleNext()}
            data-test-id="save-next-btn"
            disabled={
              (isSubmitting || !isValid || !isDirty || submit) && step === 2
            }
          >
            {step === 2 ? 'Save Changes' : 'Next'}
          </Button>
        </FormButtonWrapper>
        <CSSTransition
          in={isSubmitting && isValid}
          timeout={{
            enter: 200,
            exit: 5000,
          }}
        >
          <Loader data-test-id="save-loader">
            {isSubmitting ? (
              <Fragment>
                <Spinner type="primary" size="1.5rem" />
                <LoadingDots color="#f08438">Saving</LoadingDots>
              </Fragment>
            ) : submitSuccess ? (
              <Fragment>
                <CheckIcon1 size="1.5rem" color="#f08438" />
                <p style={{ color: '#f08438', margin: '0 0.7rem' }}>Saved</p>
              </Fragment>
            ) : (
              <Fragment>
                <WarningIcon size="1.5rem" color="#f08438" />
                <p style={{ color: '#f08438', margin: '0 0.7rem' }}>Failed</p>
              </Fragment>
            )}
          </Loader>
        </CSSTransition>
      </Wrapper>
    </Fragment>
  )
}

export default CoverLetterStepper

const Wrapper = styled.div`
  padding: 2.75rem;
  max-width: 900px;
  margin: auto;
`

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 0 0.5rem;
  height: 50px;
  min-width: 50px;
  transition: ease 300ms;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 4px 0px 20px 0px #ddd;
  border: 1px solid #eee;
  position: absolute;
  left: 40px;
  bottom: 40px;
  opacity: 0;
  visibility: hidden;

  &.enter-done,
  &.enter-active,
  &.exit-active {
    opacity: 1;
    visibility: visible;
  }
  &.exit-done {
    opacity: 0;
    visibility: hidden;
  }
`

const dots = (color: string) => keyframes`
   0%, 20% {
    color: rgba(0,0,0,0);
    text-shadow:
      .25em 0 0 rgba(0,0,0,0),
      .5em 0 0 rgba(0,0,0,0);}
  40% {
    color: ${color};
    text-shadow:
      .25em 0 0 rgba(0,0,0,0),
      .5em 0 0 rgba(0,0,0,0);}
  60% {
    text-shadow:
      .25em 0 0 ${color},
      .5em 0 0 rgba(0,0,0,0);}
  80%, 100% {
    text-shadow:
      .25em 0 0 ${color},
      .5em 0 0 ${color};
    }
    
`

const LoadingDots = styled.p<{ color: string }>`
  display: inline-flex;
  margin: 0 0.7rem;
  color: ${({ theme, color }) => (color ? color : theme.colors.dark)};
  &:after {
    content: '.';
    margin-left: 0.1rem;
    animation: ${({ theme, color }) => dots(color ? color : theme.colors.dark)}
      1s steps(5, end) infinite;
  }
`
