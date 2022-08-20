import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
}
const ThreeDotsIcon = ({ size, color, className }: IconProps) => {
  return (
    <Fragment>
      <svg
        width={size || '1rem'}
        className={className || ''}
        height={size || '1rem'}
        viewBox='0 0 15 4'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          cx='1.63043'
          cy='1.63043'
          r='1.63043'
          fill={color || '#898989'}
        />
        <circle
          cx='7.49958'
          cy='1.63043'
          r='1.63043'
          fill={color || '#898989'}
        />
        <circle
          cx='13.3687'
          cy='1.63043'
          r='1.63043'
          fill={color || '#898989'}
        />
      </svg>
    </Fragment>
  )
}

export default ThreeDotsIcon
