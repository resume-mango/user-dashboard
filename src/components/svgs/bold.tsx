import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
}
const BoldIcon = ({ size, color, className }: IconProps) => {
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
          d='M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z'
        />
      </svg>
    </Fragment>
  )
}

export default BoldIcon
