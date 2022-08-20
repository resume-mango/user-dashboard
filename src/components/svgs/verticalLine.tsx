import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
}
const VerticalLineIcon = ({ size, color, className }: IconProps) => {
  return (
    <Fragment>
      <svg
        width={size || '1rem'}
        className={className || ''}
        height={size || '1rem'}
        viewBox='0 0 1 28'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M0.5 0V27.5' stroke={color || '#898989'} />
      </svg>
    </Fragment>
  )
}

export default VerticalLineIcon
