import React, { Fragment, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import Input from '../../../components/form/Input'
import { useCoverLetter } from '../../../contexts/coverLetter'

const Step1 = () => {
  const { data } = useCoverLetter()

  const [titleVal, setTitleVal] = useState('')

  const { setValue } = useFormContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 30) {
      setTitleVal(e.target.value.substring(0, 30))
    } else {
      setTitleVal(e.target.value)
    }
  }

  useEffect(() => {
    setTitleVal(data.title)
  }, [data.title])

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue('title', titleVal, { shouldDirty: true })
    }, 300)
    return () => clearTimeout(timer)
  }, [titleVal])

  return (
    <Fragment>
      <TitleWrapper>
        <input
          name="title"
          placeholder="Untitled"
          value={titleVal}
          onChange={(e) => handleChange(e)}
          spellCheck={false}
          autoComplete="off"
        />
        <p id="mask">{titleVal}</p>
      </TitleWrapper>
      <h2>Primary Details</h2>
      <Grid className="mb-3">
        <div>
          <Input name="first_name" label="First Name" />
        </div>
        <div>
          <Input name="last_name" label="Last Name" />
        </div>
        <div>
          <Input name="email_address" label="Email address" />
        </div>
        <div>
          <Input name="phone_number" label="Phone number" />
        </div>
        <div>
          <Input name="designation" label="Designation" />
        </div>
        <div>
          <Input name="address" label="Address" />
        </div>
      </Grid>
      <h2>Company Details</h2>
      <Grid className="mb-3">
        <div>
          <Input name="company" label="Company Name" />
        </div>
        <div>
          <Input name="hiring_manager" label="Hiring manager name" />
        </div>
      </Grid>
    </Fragment>
  )
}

export default Step1

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.5rem;
`
const TitleWrapper = styled.div`
  overflow: hidden;
  max-width: 100%;
  position: relative;
  top: -20px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    background-color: transparent;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    padding: 0px;
    margin: 0px;
    border: none;
    font-size: 2rem;
    text-align: center;
    z-index: 1;
    color: #555;
  }
  input:focus {
    color: #343434;
  }
  input:hover ~ p:after,
  input:focus ~ p:after {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  p {
    height: 100%;
    position: relative;
    width: fit-content;
    font-size: 2rem;
    text-align: center;
    margin: 0;
    color: transparent;
    &:after {
      content: '';
      display: flex;
      height: 2px;
      z-index: 100;
      bottom: -10px;
      width: 100%;
      background-color: transparent;
    }
  }
`
