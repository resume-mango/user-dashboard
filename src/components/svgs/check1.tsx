import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
}
const CheckIcon1 = ({ size, color, className }: IconProps) => {
  return (
    <Fragment>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 22 22'
        width={size || '1rem'}
        className={className || ''}
        height={size || '1rem'}
      >
        <circle cx='11' cy='11' r='11' fill={color || '#898989'} />
        <path
          d='M5.89453 10.6357L9.63735 14.3098L16.3064 7.46828'
          stroke='white'
          fill='none'
        />
      </svg>
    </Fragment>
  )
}

export default CheckIcon1
