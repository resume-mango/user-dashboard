import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
}
const JustCheckIcon = ({ size, color, className }: IconProps) => {
  return (
    <Fragment>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 25 18'
        width={size || '1rem'}
        className={className || ''}
        height={size || '1rem'}
      >
        <path d='M24 1L8 17' stroke={color || '#898989'} strokeWidth='2' />
        <path d='M1 9L9.49999 17' stroke={color || '#898989'} strokeWidth='2' />
      </svg>
    </Fragment>
  )
}

export default JustCheckIcon
