import React, { Fragment } from 'react'
import { useFormContext } from 'react-hook-form'
import RichTextEditor from '../../../components/form/RichTextEditor'
import { InvalidFeedBack } from '../../../styled/form'

const Step2 = () => {
  const {
    formState: { errors }
  } = useFormContext()
  return (
    <Fragment>
      <div className='mb-3'>
        <h2>Letter Details</h2>
        <p className='mb-3'>
          3–4 paragraphs explaining why you&apos;re the perfect candidate for a
          specific job
        </p>

        <RichTextEditor name='description' />
        {errors.description && (
          <InvalidFeedBack style={{ marginTop: '0.5rem' }}>
            {errors.description.message}
          </InvalidFeedBack>
        )}
      </div>
    </Fragment>
  )
}

export default Step2
