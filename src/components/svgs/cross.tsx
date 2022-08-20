import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
}
const CrossIcon = ({ size, color, className }: IconProps) => {
  return (
    <Fragment>
      <svg
        width={size || '1rem'}
        height={size || '1rem'}
        className={className || ''}
        viewBox='0 0 18 18'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M17 1L1 17' stroke={color || '#898989'} strokeWidth='2' />
        <path
          d='M0.999999 1L17 17'
          stroke={color || '#898989'}
          strokeWidth='2'
        />
      </svg>
    </Fragment>
  )
}

export default CrossIcon
