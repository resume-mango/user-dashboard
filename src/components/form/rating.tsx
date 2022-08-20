import React, { Fragment, useState } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import Star from '../svgs/star'

interface IInput {
  name: string
}

const Rating: React.FC<
  IInput &
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
> = ({ name, ...props }) => {
  const [hover, setHover] = useState(0)

  const { control } = useFormContext()

  const {
    field: { onBlur, onChange, value }
  } = useController({
    name,
    control
  })

  return (
    <Fragment>
      <RatingWrapper>
        {[...Array(5)].map((star, i) => {
          i += 1
          return (
            <IconButton
              type='button'
              key={i}
              colored={i <= (hover || value) ? true : false}
              onClick={() => onChange(i)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(value)}
            >
              <Star size='1.3rem' />
            </IconButton>
          )
        })}
        <input
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          hidden
          type='number'
          min={0}
          max={5}
          {...props}
        />
      </RatingWrapper>
    </Fragment>
  )
}

export default Rating

const RatingWrapper = styled.div`
  display: inline-flex;
  width: fit-content;
  user-select: none;
  height: auto;
`

const IconButton = styled.button<{ colored: boolean }>`
  width: fit-content;
  display: inline-flex;
  padding: 0 0.3rem;
  margin: 0;
  cursor: pointer;
  svg {
    path {
      ${({ colored, theme }) => colored && `fill: ${theme.colors.primary}`}
    }
  }
`
