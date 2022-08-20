import React, { Fragment } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import FormAccordian from '../../../../components/accordian/formAccordian'
import Input from '../../../../components/form/Input'
import LanguagesIcon from '../../../../components/svgs/language'
import {
  resumeAddItemToAccoridan,
  resumeDeleteAccordianItem,
  resumeOpensAccordianItem,
  resumeToggleAccordian,
} from '../../../../helpers/resume'
import { Grid } from '../styled'

interface ILang {
  language: string | undefined
  level: string | undefined
}

interface IDefault {
  languages: ILang[]
}

interface IProps {
  data: any
  show: boolean
  setShow: (val: string | null) => void
  open: string | null
  setOpen: (val: string | null) => void
}

const LanguagesAccordian: React.FC<IProps> = ({
  data,
  show,
  setShow,
  open,
  setOpen,
}) => {
  const { languages } = data
  const defaultValues = {
    language: '',
    level: '',
  }

  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext<IDefault>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'languages',
  })

  return (
    <Fragment>
      <FormAccordian
        openIds={open}
        show={show}
        onClick={() =>
          resumeToggleAccordian(
            'languages',
            languages,
            defaultValues,
            append,
            show,
            setShow,
            setOpen
          )
        }
        title="Languages"
        icon={<LanguagesIcon size="1.8rem" color="#343434" />}
        isError={!!errors['languages']}
        length={languages.length}
      >
        {fields.map((item, i) => (
          <Fragment key={item.id}>
            <FormAccordian.Item
              title={
                languages[i].language ? languages[i].langauge : '(Unspecified)'
              }
              description={languages[i].language && languages[i].level}
              open={open === 'languages.' + i ? true : false}
              handleDelete={() => resumeDeleteAccordianItem(remove, i)}
              handleOpen={() =>
                resumeOpensAccordianItem('languages', i, trigger, open, setOpen)
              }
              isError={
                errors['languages'] && errors['languages'][i] ? true : false
              }
            >
              <Grid>
                <div>
                  <Input
                    name={`languages.${i}.language`}
                    label="Language"
                    className="smb"
                    isFieldArray={true}
                  />
                </div>
                <div>
                  <Input
                    name={`languages.${i}.level`}
                    label="Level"
                    className="smb"
                    isFieldArray={true}
                  />
                </div>
              </Grid>
            </FormAccordian.Item>
          </Fragment>
        ))}
        <FormAccordian.Footer
          title={'Add another language'}
          onClick={() =>
            resumeAddItemToAccoridan(
              'languages',
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

export default LanguagesAccordian
