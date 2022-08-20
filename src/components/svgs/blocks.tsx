import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
}
const BlocksIcon = ({ size, color, className }: IconProps) => {
  return (
    <Fragment>
      <svg
        width={size || '1rem'}
        className={className || ''}
        height={size || '1rem'}
        viewBox='0 0 19 19'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M18 1H1V7.61111H18V1Z'
          stroke={color || '#898989'}
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M17.9996 11.3887H13.2773V17.9998H17.9996V11.3887Z'
          stroke={color || '#898989'}
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M9.5 11.3887H1V17.9998H9.5V11.3887Z'
          stroke={color || '#898989'}
          strokeWidth='1.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </Fragment>
  )
}

export default BlocksIcon
