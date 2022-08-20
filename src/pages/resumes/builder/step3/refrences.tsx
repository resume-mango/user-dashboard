import React, { Fragment } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import FormAccordian from '../../../../components/accordian/formAccordian'
import Input from '../../../../components/form/Input'
import ReferenceIcon from '../../../../components/svgs/reference'
import {
  resumeAddItemToAccoridan,
  resumeDeleteAccordianItem,
  resumeOpensAccordianItem,
  resumeToggleAccordian,
} from '../../../../helpers/resume'
import { Grid } from '../styled'

interface IRef {
  name: string | undefined
  company: string | undefined
  phone_number: string | undefined
  email_address: string | undefined
}

interface IDefault {
  references: IRef[]
}

interface IProps {
  data: any
  show: boolean
  setShow: (val: string | null) => void
  open: string | null
  setOpen: (val: string | null) => void
}

const RefrencesAccordian: React.FC<IProps> = ({
  data,
  show,
  setShow,
  open,
  setOpen,
}) => {
  const { references } = data
  const defaultValues = {
    name: '',
    company: '',
    phone_number: '',
    email_address: '',
  }

  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext<IDefault>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'references',
  })

  return (
    <Fragment>
      <FormAccordian
        openIds={open}
        show={show}
        onClick={() =>
          resumeToggleAccordian(
            'references',
            references,
            defaultValues,
            append,
            show,
            setShow,
            setOpen
          )
        }
        title="References"
        icon={<ReferenceIcon size="1.8rem" color="#343434" />}
        isError={!!errors['references']}
        length={references.length}
      >
        {fields.map((item, i) => (
          <Fragment key={item.id}>
            <FormAccordian.Item
              title={references[i].name ? references[i].name : '(Unspecified)'}
              description={references[i].name && references[i].company}
              open={open === 'references.' + i ? true : false}
              handleDelete={() => resumeDeleteAccordianItem(remove, i)}
              handleOpen={() =>
                resumeOpensAccordianItem(
                  'references',
                  i,
                  trigger,
                  open,
                  setOpen
                )
              }
              isError={
                errors['references'] && errors['references'][i] ? true : false
              }
            >
              <Grid>
                <div>
                  <Input
                    name={`references.${i}.name`}
                    label="Referent's full name"
                    className="smb"
                    isFieldArray={true}
                  />
                </div>
                <div>
                  <Input
                    name={`references.${i}.company`}
                    label="Company"
                    className="smb"
                    isFieldArray={true}
                  />
                </div>
                <div>
                  <Input
                    name={`references.${i}.phone_number`}
                    label="Phone"
                    className="smb"
                    isFieldArray={true}
                  />
                </div>
                <div>
                  <Input
                    name={`references.${i}.email_address`}
                    label="Email"
                    className="smb"
                    isFieldArray={true}
                  />
                </div>
              </Grid>
            </FormAccordian.Item>
          </Fragment>
        ))}
        <FormAccordian.Footer
          title={'Add another reference'}
          onClick={() =>
            resumeAddItemToAccoridan(
              'references',
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

export default RefrencesAccordian
