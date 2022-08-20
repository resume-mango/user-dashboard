import React, { Fragment } from 'react'
import Input from '../../../../components/form/Input'
import DegreeHatIcon from '../../../../components/svgs/degreeHatIcon'
import { useFieldArray, useFormContext } from 'react-hook-form'
import FormAccordian from '../../../../components/accordian/formAccordian'
import { Grid, SubGrid } from '../styled'
import DatePicker from '../../../../components/form/datePicker'
import { InvalidFeedBack } from '../../../../styled/form'
import RichTextEditor from '../../../../components/form/RichTextEditor'
import {
  resumeAddItemToAccoridan,
  resumeDeleteAccordianItem,
  resumeOpensAccordianItem,
  resumeToggleAccordian,
} from '../../../../helpers/resume'

interface IEdu {
  institution: string | undefined
  degree: string | undefined
  duration: {
    start: string | undefined
    end: string | undefined
  }
  city: string | undefined
  description: string | undefined
}

interface IDefault {
  education: IEdu[]
}
interface IProps {
  data: any
  show: boolean
  setShow: (val: string | null) => void
  open: string | null
  setOpen: (val: string | null) => void
}

const EducationAccordian: React.FC<IProps> = ({
  data,
  show,
  setShow,
  open,
  setOpen,
}) => {
  const { education } = data
  const defaultValues = {
    institution: '',
    degree: '',
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
    name: 'education',
  })

  return (
    <Fragment>
      <FormAccordian
        openIds={open}
        show={show}
        onClick={() =>
          resumeToggleAccordian(
            'education',
            education,
            defaultValues,
            append,
            show,
            setShow,
            setOpen
          )
        }
        title="Education"
        icon={<DegreeHatIcon size="2.2rem" color="#343434" />}
        isError={!!errors['education']}
        length={education.length}
      >
        {fields.map((item, i) => (
          <Fragment key={item.id}>
            <FormAccordian.Item
              title={
                education[i].institution
                  ? education[i].institution
                  : '(Unknown institution)'
              }
              description={
                education[i].institution &&
                education[i].duration.start + '-' + education[i].duration.end
              }
              open={open === 'education.' + i}
              handleDelete={() => resumeDeleteAccordianItem(remove, i)}
              handleOpen={() =>
                resumeOpensAccordianItem('education', i, trigger, open, setOpen)
              }
              isError={
                errors['education'] && errors['education'][i] ? true : false
              }
            >
              <Grid>
                <div>
                  <Input
                    name={`education.${i}.institution`}
                    label="Name of institution"
                    placeholder="e.g. Pulchowk Engineering"
                    className="smb"
                    isFieldArray={true}
                  />
                </div>
                <div>
                  <Input
                    name={`education.${i}.degree`}
                    label="Degree"
                    placeholder="Educaton degree"
                    className="smb"
                    isFieldArray={true}
                  />
                </div>
                <div className="smb">
                  <label>Start and End date</label>
                  <SubGrid>
                    <div>
                      <DatePicker name={`education.${i}.duration.start`} />
                    </div>
                    <div>
                      <DatePicker name={`education.${i}.duration.end`} />
                    </div>
                  </SubGrid>
                  {errors.education &&
                  (errors as any).education[i] &&
                  (errors as any).education[i].duration &&
                  (errors as any).education[i].duration.message ? (
                    <InvalidFeedBack className="invalid-feild">
                      {(errors as any).education[i].duration?.message}
                    </InvalidFeedBack>
                  ) : null}
                </div>
                <div>
                  <Input
                    name={`education.${i}.city`}
                    label="City"
                    placeholder="e.g. California"
                    className="smb"
                    isFieldArray={true}
                  />
                </div>
              </Grid>
              <div className="mb-2">
                <RichTextEditor
                  name={`education.${i}.description`}
                  maxHeight="150px"
                  formats={['bold', 'italic', 'underline', 'list', 'bullet']}
                  modules={{
                    toolbar: [
                      ['bold', 'italic', 'underline'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                    ],
                  }}
                />
                {errors.education &&
                (errors as any).education[i] &&
                (errors as any).education[i].description &&
                (errors as any).education[i].description.message ? (
                  <InvalidFeedBack className="invalid-feild">
                    {(errors as any).education[i].description?.message}
                  </InvalidFeedBack>
                ) : null}
              </div>
            </FormAccordian.Item>
          </Fragment>
        ))}
        <FormAccordian.Footer
          title={'Add education'}
          onClick={() =>
            resumeAddItemToAccoridan(
              'education',
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

export default EducationAccordian
