import React, { Fragment } from 'react'
import styled from 'styled-components'
import Input from '../../../../components/form/Input'
import Rating from '../../../../components/form/rating'
import BulbIcon from '../../../../components/svgs/bulbIcon'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Grid } from '../styled'
import FormAccordian from '../../../../components/accordian/formAccordian'
import Star from '../../../../components/svgs/star'
import {
  resumeAddItemToAccoridan,
  resumeDeleteAccordianItem,
  resumeOpensAccordianItem,
  resumeToggleAccordian,
} from '../../../../helpers/resume'

interface ISkill {
  title: string
  rating: number
}

interface IDefault {
  skills: ISkill[]
}
interface IProps {
  data: any
  show: boolean
  setShow: (val: string | null) => void
  open: string | null
  setOpen: (val: string | null) => void
}

const StarRating = ({ rate }: { rate: number }) => {
  return (
    <Fragment>
      {[...Array(5)].map((star, i) => (
        <span key={i} style={{ marginRight: '0.2rem' }}>
          <Star
            color={i + 1 <= rate ? 'rgba(240,132,56,1)' : '#D9D9D9'}
            size="0.875rem"
          />
        </span>
      ))}
    </Fragment>
  )
}

const SkillsFormAccordian: React.FC<IProps> = ({
  data,
  show,
  setShow,
  open,
  setOpen,
}) => {
  const { skills } = data

  const defaultValues = {
    title: '',
    rating: 0,
  }

  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext<IDefault>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  })

  return (
    <Fragment>
      <FormAccordian
        openIds={open}
        show={show}
        onClick={() =>
          resumeToggleAccordian(
            'skills',
            skills,
            defaultValues,
            append,
            show,
            setShow,
            setOpen
          )
        }
        title="Skills"
        icon={<BulbIcon size="2rem" color="#343434" />}
        isError={!!errors['skills']}
        length={skills.length}
      >
        {fields.map((item, i) => (
          <Fragment key={item.id}>
            <FormAccordian.Item
              title={skills[i].title ? skills[i].title : '(Unknown skill)'}
              description={
                skills[i].title && <StarRating rate={skills[i].rating} />
              }
              open={open === 'skills.' + i}
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
              isError={errors['skills'] && errors['skills'][i] ? true : false}
            >
              <Grid>
                <div>
                  <Input
                    name={`skills.${i}.title`}
                    label="Skill"
                    className="smb"
                    isFieldArray={true}
                  />
                </div>
                <div className="smb">
                  <label>Rate</label>
                  <RatingWrapper>
                    <Rating name={`skills.${i}.rating`} />
                  </RatingWrapper>
                </div>
              </Grid>
            </FormAccordian.Item>
          </Fragment>
        ))}
        <FormAccordian.Footer
          title={'Add skill'}
          onClick={() =>
            resumeAddItemToAccoridan(
              'skills',
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

export default SkillsFormAccordian

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
`
