import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
}
const DownArrowIcon = ({ size, color, className }: IconProps) => {
  return (
    <Fragment>
      <svg
        width={size || '1rem'}
        className={className || ''}
        height={size || '1rem'}
        viewBox='0 0 14 8'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M1 1L7 7L13 1' stroke={color || '#898989'} />
      </svg>
    </Fragment>
  )
}

export default DownArrowIcon
