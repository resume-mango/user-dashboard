import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
}
const PlusIcon = ({ size, color, className }: IconProps) => {
  return (
    <Fragment>
      <svg
        width={size || '1rem'}
        height={size || '1rem'}
        className={className || ''}
        viewBox='0 0 20 19'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M19.5406 9.44757H0.0765508'
          stroke={color || '#898989'}
          strokeWidth='1.5'
        />
        <path
          d='M9.81017 0.000184768L9.81017 18.8953'
          stroke={color || '#898989'}
          strokeWidth='1.5'
        />
      </svg>
    </Fragment>
  )
}

export default PlusIcon
