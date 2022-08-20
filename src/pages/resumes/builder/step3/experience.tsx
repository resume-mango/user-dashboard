import React, { Fragment } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import FormAccordian from '../../../../components/accordian/formAccordian'
import DatePicker from '../../../../components/form/datePicker'
import Input from '../../../../components/form/Input'
import RichTextEditor from '../../../../components/form/RichTextEditor'
import BreifCaseIcon from '../../../../components/svgs/breifCaseIcon'
import {
  resumeAddItemToAccoridan,
  resumeDeleteAccordianItem,
  resumeOpensAccordianItem,
  resumeToggleAccordian,
} from '../../../../helpers/resume'
import { InvalidFeedBack } from '../../../../styled/form'
import { Grid, SubGrid } from '../styled'

interface IExp {
  company: string | undefined
  designation: string | undefined
  duration: {
    start: string | undefined
    end: string | undefined
  }
  city: string | undefined
  description: string | undefined
}

interface IDefault {
  experience: IExp[]
}
interface IProps {
  data: any
  show: boolean
  setShow: (val: string | null) => void
  open: string | null
  setOpen: (val: string | null) => void
}

const Experience: React.FC<IProps> = ({
  data,
  show,
  setShow,
  open,
  setOpen,
}) => {
  const { experience } = data
  const defaultValues = {
    company: '',
    designation: '',
    duration: {
      start: '',
      end: '',
    },
    city: '',
    description: '',
  }

  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext<IDefault>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience',
  })

  return (
    <Fragment>
      <FormAccordian
        openIds={open}
        show={show}
        onClick={() =>
          resumeToggleAccordian(
            'experience',
            experience,
            defaultValues,
            append,
            show,
            setShow,
            setOpen
          )
        }
        title="Experience"
        icon={<BreifCaseIcon size="1.8rem" color="#343434" />}
        isError={!!errors['experience']}
        length={experience.length}
      >
        {fields.map((item, i) => (
          <Fragment key={item.id}>
            <FormAccordian.Item
              title={
                experience[i].company
                  ? experience[i].company
                  : '(Unknown company)'
              }
              description={
                experience[i].company &&
                experience[i].duration.start + '-' + experience[i].duration.end
              }
              open={open === 'experience.' + i ? true : false}
              handleDelete={() => resumeDeleteAccordianItem(remove, i)}
              handleOpen={() =>
                resumeOpensAccordianItem(
                  'experience',
                  i,
                  trigger,
                  open,
                  setOpen
                )
              }
              isError={
                errors['experience'] && errors['experience'][i] ? true : false
              }
            >
              <Grid>
                <div>
                  <Input
                    name={`experience.${i}.company`}
                    label="Company name"
                    placeholder="e.g. Google"
                    className="smb"
                    isFieldArray={true}
                  />
                </div>
                <div>
                  <Input
                    name={`experience.${i}.designation`}
                    label="Designation"
                    placeholder="e.g. Content Writer"
                    className="smb"
                    isFieldArray={true}
                  />
                </div>
                <div className="smb">
                  <label>Start and End date</label>
                  <SubGrid>
                    <div>
                      <DatePicker name={`experience.${i}.duration.start`} />
                    </div>
                    <div>
                      <DatePicker name={`experience.${i}.duration.end`} />
                    </div>
                  </SubGrid>
                  {errors.experience &&
                  (errors as any).experience[i] &&
                  (errors as any).experience[i].duration &&
                  (errors as any).experience[i].duration.message ? (
                    <InvalidFeedBack className="invalid-feild">
                      {(errors as any).experience[i].duration?.message}
                    </InvalidFeedBack>
                  ) : null}
                </div>
                <div>
                  <Input
                    name={`experience.${i}.city`}
                    label="City"
                    placeholder="e.g. California"
                    className="smb"
                    isFieldArray={true}
                  />
                </div>
              </Grid>
              <div className="mb-2">
                <RichTextEditor
                  name={`experience.${i}.description`}
                  maxHeight="150px"
                  formats={['bold', 'italic', 'underline', 'list', 'bullet']}
                  modules={{
                    toolbar: [
                      ['bold', 'italic', 'underline'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                    ],
                  }}
                />
                {errors.experience &&
                (errors as any).experience[i] &&
                (errors as any).experience[i].description &&
                (errors as any).experience[i].description.message ? (
                  <InvalidFeedBack className="invalid-feild">
                    {(errors as any).experience[i].description?.message}
                  </InvalidFeedBack>
                ) : null}
              </div>
            </FormAccordian.Item>
          </Fragment>
        ))}
        <FormAccordian.Footer
          title={'Add another experience'}
          onClick={() =>
            resumeAddItemToAccoridan(
              'experience',
              fields.length,
              defaultValues,
              append,
              setOpen
            )
          }
        />
      </FormAccordian>
    </Fragment>
  )
}

export default Experience
