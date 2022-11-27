import React, { Fragment, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useResume } from '../../../../contexts/resume'
import CoursesAccordian from './courses'
import EducationAccordian from './education'
import Experience from './experience'
import InternshipAccordian from './internships'
import LanguagesAccordian from './languages'
import OtherSection from './otherSection'
import RefrencesAccordian from './refrences'
import SkillsAccordian from './skills'

const Step3 = () => {
  const [showAccordian, setShowAccordian] = useState<string | null>(null)
  const [showAccordianItem, setShowAccordianItem] = useState<string | null>(
    null
  )
  const [otherFields, setOtherFields] = useState<Array<string>>([])

  const { data } = useResume()

  const {
    formState: { isSubmitting }
  } = useFormContext()

  useEffect(() => {
    if (isSubmitting) {
      setShowAccordianItem(null)
    }
  }, [isSubmitting])

  useEffect(() => {
    const filledFeilds = []

    if (otherFields.length === 0) {
      data.courses.length > 0 && filledFeilds.push('courses')

      data.internships.length > 0 && filledFeilds.push('internships')

      data.languages.length > 0 && filledFeilds.push('languages')

      data.references.length > 0 && filledFeilds.push('references')
    } else {
      otherFields.map((field) => {
        (data as any)[field].length > 0 && filledFeilds.push(field.toString())
      })
    }
    setOtherFields(filledFeilds)
  }, [data.courses, data.internships, data.languages, data.references])

  const fields: any = {
    courses: (
      <CoursesAccordian
        data={data}
        show={showAccordian === 'courses'}
        setShow={setShowAccordian}
        open={showAccordianItem}
        setOpen={setShowAccordianItem}
      />
    ),

    internships: (
      <InternshipAccordian
        data={data}
        show={showAccordian === 'internships'}
        setShow={setShowAccordian}
        open={showAccordianItem}
        setOpen={setShowAccordianItem}
      />
    ),

    languages: (
      <LanguagesAccordian
        data={data}
        show={showAccordian === 'languages'}
        setShow={setShowAccordian}
        open={showAccordianItem}
        setOpen={setShowAccordianItem}
      />
    ),
    references: (
      <RefrencesAccordian
        data={data}
        show={showAccordian === 'references'}
        setShow={setShowAccordian}
        open={showAccordianItem}
        setOpen={setShowAccordianItem}
      />
    )
  }

  return (
    <Fragment>
      <div className='mb-3'>
        <h2>Your objective</h2>
        <p className='mb-3' style={{ maxWidth: '525px' }}>
          This appears near the top of your resume. Impress employers with a
          strong opening statement that sums up your strengths and experience.
        </p>
        <Experience
          data={data}
          show={showAccordian === 'experience'}
          setShow={setShowAccordian}
          open={showAccordianItem}
          setOpen={setShowAccordianItem}
        />

        <EducationAccordian
          data={data}
          show={showAccordian === 'education'}
          setShow={setShowAccordian}
          open={showAccordianItem}
          setOpen={setShowAccordianItem}
        />
        <SkillsAccordian
          data={data}
          show={showAccordian === 'skills'}
          setShow={setShowAccordian}
          open={showAccordianItem}
          setOpen={setShowAccordianItem}
        />
        {otherFields.map((field: any, i) => (
          <div key={i}>{fields[field]}</div>
        ))}

        {otherFields.length !== 4 && (
          <OtherSection
            otherFields={otherFields}
            setOtherFields={setOtherFields}
          />
        )}
      </div>
    </Fragment>
  )
}

export default Step3
