import React, { Fragment } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import RichTextEditor from '../../../components/form/RichTextEditor'
import SearchDropdown from '../../../components/ui/searchDropdown'
import { InvalidFeedBack } from '../../../styled/form'

const initalData = [
  {
    id: '1',
    text: "Sometimes there isn't a good answer. No matter how you try to rationalize the outcome, it doesn't make sense. And instead of an answer."
  },
  {
    id: '2',
    text: 'The chair sat in the corner where it had been for over 25 years. The only difference was there was someone actually sitting in it.'
  },
  {
    id: '3',
    text: " She tried to explain that love wasn't like pie. There wasn't a set number of slices to be given out."
  },
  {
    id: '4',
    text: 'Her mom had warned her. She had been warned time and again, but she had refused to believe her.'
  },
  {
    id: '5',
    text: " It was a concerning development that he couldn't get out of his mind."
  },
  {
    id: '6',
    text: 'Colors bounced around in her head. They mixed and threaded themselves together.'
  },
  {
    id: '7',
    text: 'The alarm went off and Jake rose awake. Rising early had become a daily ritual, one that he could not fully explain.'
  },
  {
    id: '8',
    text: 'Punctuality means time-sense. To fulfil your assignments on time is punctuality.'
  },
  {
    id: '9',
    text: 'Those who are punctual are loved and liked by all. They finish their job in time and are able to give finishing touches needed for the job'
  }
]

const Step2 = () => {
  const {
    setValue,
    watch,
    formState: { errors }
  } = useFormContext()
  const desc = watch('about_info')

  const handleClick = (text: string) => {
    const regex = /(<([^>]+)>)/gi
    const hasTextinDescription = !!desc.replace(regex, '').length

    const val = `${hasTextinDescription ? desc + '<br>' : ''}<p>${text}</p>`
    setValue('about_info', val)
  }

  return (
    <Fragment>
      <div className='mb-3'>
        <h2>Tell us about yourself</h2>
        <p className='mb-3' style={{ maxWidth: '525px' }}>
          This appears near the top of your resume. Impress employers with a
          strong opening statement that sums up your strengths and experience.
        </p>
        <FlexWrapper>
          <label>Short description</label>
          <SearchDropdown data={initalData} handleClick={handleClick} />
        </FlexWrapper>
        <RichTextEditor name='about_info' />
        {errors.about_info && (
          <InvalidFeedBack style={{ marginTop: '0.5rem' }}>
            {errors.about_info.message}
          </InvalidFeedBack>
        )}
      </div>
    </Fragment>
  )
}

export default Step2

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 0.5rem;
  label {
    margin-bottom: 0;
  }
`
