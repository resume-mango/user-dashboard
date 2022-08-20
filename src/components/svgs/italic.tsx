import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
}
const ItalicIcon = ({ size, color, className }: IconProps) => {
  return (
    <Fragment>
      <svg
        width={size || '1rem'}
        className={className || ''}
        height={size || '1rem'}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fill={color || '#898989'}
          d='M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z'
        />
      </svg>
    </Fragment>
  )
}

export default ItalicIcon
