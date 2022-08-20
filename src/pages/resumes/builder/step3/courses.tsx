import React, { Fragment } from 'react'
import Input from '../../../../components/form/Input'
import DegreeHatIcon from '../../../../components/svgs/degreeHatIcon'
import { useFieldArray, useFormContext } from 'react-hook-form'
import FormAccordian from '../../../../components/accordian/formAccordian'
import { Grid } from '../styled'
import DatePicker from '../../../../components/form/datePicker'
import { InvalidFeedBack } from '../../../../styled/form'
import {
  resumeAddItemToAccoridan,
  resumeDeleteAccordianItem,
  resumeOpensAccordianItem,
  resumeToggleAccordian,
} from '../../../../helpers/resume'

interface ICourse {
  institution: string | undefined
  course: string | undefined
  duration: {
    start: string | undefined
    end: string | undefined
  }
}

interface IDefault {
  courses: ICourse[]
}
interface IProps {
  data: any
  show: boolean
  setShow: (val: string | null) => void
  open: string | null
  setOpen: (val: string | null) => void
}

const CoursesAccordian: React.FC<IProps> = ({
  data,
  show,
  setShow,
  open,
  setOpen,
}) => {
  const { courses } = data
  const defaultValues = {
    institution: '',
    course: '',
    duration: {
      start: '',
      end: '',
    },
  }

  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext<IDefault>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'courses',
  })

  return (
    <Fragment>
      <FormAccordian
        openIds={open}
        show={show}
        onClick={() =>
          resumeToggleAccordian(
            'courses',
            courses,
            defaultValues,
            append,
            show,
            setShow,
            setOpen
          )
        }
        title="Courses"
        icon={<DegreeHatIcon size="2.2rem" color="#343434" />}
        isError={!!errors['courses']}
        length={courses.length}
      >
        {fields.map((item, i) => (
          <Fragment key={item.id}>
            <FormAccordian.Item
              title={
                courses[i].course ? courses[i].course : '(Unknown institution)'
              }
              description={
                courses[i].course &&
                courses[i].duration.start + '-' + courses[i].duration.end
              }
              open={open === 'courses.' + i}
              handleDelete={() => resumeDeleteAccordianItem(remove, i)}
              handleOpen={() =>
                resumeOpensAccordianItem('courses', i, trigger, open, setOpen)
              }
              isError={errors['courses'] && errors['courses'][i] ? true : false}
            >
              <Grid>
                <div>
                  <Input
                    name={`courses.${i}.course`}
                    label="Course"
                    className="smb"
                    isFieldArray={true}
                  />
                </div>
                <div>
                  <Input
                    name={`courses.${i}.institution`}
                    label="Name of institution"
                    className="smb"
                    isFieldArray={true}
                  />
                </div>

                <div className="smb">
                  <label>Start date</label>

                  <DatePicker name={`courses.${i}.duration.start`} />
                  {errors.courses &&
                  (errors as any).courses[i] &&
                  (errors as any).courses[i].duration &&
                  (errors as any).courses[i].duration.message ? (
                    <InvalidFeedBack className="invalid-feild">
                      {(errors as any).courses[i].duration?.message}
                    </InvalidFeedBack>
                  ) : null}
                </div>
                <div>
                  <label>End date</label>

                  <DatePicker name={`courses.${i}.duration.end`} />
                </div>
              </Grid>
            </FormAccordian.Item>
          </Fragment>
        ))}
        <FormAccordian.Footer
          title={'Add another course'}
          onClick={() =>
            resumeAddItemToAccoridan(
              'courses',
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

export default CoursesAccordian
