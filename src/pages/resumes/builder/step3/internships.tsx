import React, { Fragment } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import FormAccordian from '../../../../components/accordian/formAccordian'
import DatePicker from '../../../../components/form/datePicker'
import Input from '../../../../components/form/Input'
import RichTextEditor from '../../../../components/form/RichTextEditor'
import InternshipIcon from '../../../../components/svgs/internship'
import {
  resumeAddItemToAccoridan,
  resumeDeleteAccordianItem,
  resumeOpensAccordianItem,
  resumeToggleAccordian,
} from '../../../../helpers/resume'
import { InvalidFeedBack } from '../../../../styled/form'
import { Grid, SubGrid } from '../styled'

interface IIntern {
  job_title: string | undefined
  employer: string | undefined
  duration: {
    start: string | undefined
    end: string | undefined
  }
  city: string | undefined
  description: string | undefined
}

interface IDefault {
  internships: IIntern[]
}

interface IProps {
  data: any
  show: boolean
  setShow: (val: string | null) => void
  open: string | null
  setOpen: (val: string | null) => void
}

const InternshipAccordian: React.FC<IProps> = ({
  data,
  show,
  setShow,
  open,
  setOpen,
}) => {
  const { internships } = data
  const defaultValues = {
    job_title: '',
    employer: '',
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
    name: 'internships',
  })

  return (
    <Fragment>
      <FormAccordian
        openIds={open}
        show={show}
        onClick={() =>
          resumeToggleAccordian(
            'internships',
            internships,
            defaultValues,
            append,
            show,
            setShow,
            setOpen
          )
        }
        title="Internships"
        icon={<InternshipIcon size="1.8rem" color="#343434" />}
        isError={!!errors['internships']}
        length={internships.length}
      >
        {fields.map((item, i) => (
          <Fragment key={item.id}>
            <FormAccordian.Item
              title={
                internships[i].job_title
                  ? internships[i].job_title
                  : '(Unspecified)'
              }
              description={
                internships[i].job_title &&
                internships[i].duration.start +
                  '-' +
                  internships[i].duration.end
              }
              open={open === 'internships.' + i ? true : false}
              handleDelete={() => resumeDeleteAccordianItem(remove, i)}
              handleOpen={() =>
                resumeOpensAccordianItem(
                  'internships',
                  i,
                  trigger,
                  open,
                  setOpen
                )
              }
              isError={
                errors['internships'] && errors['internships'][i] ? true : false
              }
            >
              <Grid>
                <div>
                  <Input
                    name={`internships.${i}.job_title`}
                    label="Job Title"
                    className="smb"
                    isFieldArray={true}
                  />
                </div>
                <div>
                  <Input
                    name={`internships.${i}.employer`}
                    label="Employer"
                    className="smb"
                    isFieldArray={true}
                  />
                </div>
                <div className="smb">
                  <label>Start and End date</label>
                  <SubGrid>
                    <div>
                      <DatePicker name={`internships.${i}.duration.start`} />
                    </div>
                    <div>
                      <DatePicker name={`internships.${i}.duration.end`} />
                    </div>
                  </SubGrid>
                  {errors.internships &&
                  (errors as any).internships[i] &&
                  (errors as any).internships[i].duration &&
                  (errors as any).internships[i].duration.message ? (
                    <InvalidFeedBack className="invalid-feild">
                      {(errors as any).internships[i].duration?.message}
                    </InvalidFeedBack>
                  ) : null}
                </div>
                <div>
                  <Input
                    name={`internships.${i}.city`}
                    label="City"
                    className="smb"
                    isFieldArray={true}
                  />
                </div>
              </Grid>
              <div className="mb-2">
                <RichTextEditor
                  name={`internships.${i}.description`}
                  maxHeight="150px"
                  formats={['bold', 'italic', 'underline', 'list', 'bullet']}
                  modules={{
                    toolbar: [
                      ['bold', 'italic', 'underline'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                    ],
                  }}
                />
                {errors.internships &&
                (errors as any).internships[i] &&
                (errors as any).internships[i].description &&
                (errors as any).internships[i].description.message ? (
                  <InvalidFeedBack className="invalid-feild">
                    {(errors as any).internships[i].description?.message}
                  </InvalidFeedBack>
                ) : null}
              </div>
            </FormAccordian.Item>
          </Fragment>
        ))}
        <FormAccordian.Footer
          title={'Add another internship'}
          onClick={() =>
            resumeAddItemToAccoridan(
              'internships',
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

export default InternshipAccordian
