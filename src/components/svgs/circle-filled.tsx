import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
  opacity?: string
}
const CircleFilled = ({ size, color, className, opacity }: IconProps) => {
  return (
    <Fragment>
      <svg
        width={size || '1rem'}
        height={size || '1rem'}
        className={className || ''}
        viewBox='0 0 60 121'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          opacity={opacity || '0.54'}
          cx='60.5'
          cy='60.5'
          r='60.5'
          fill={color || '#F4CBCD'}
        />
      </svg>
    </Fragment>
  )
}

export default CircleFilled
