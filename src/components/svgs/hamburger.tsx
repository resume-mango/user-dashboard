import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
}
const HamburgerIcon = ({ size, color, className }: IconProps) => {
  return (
    <Fragment>
      <svg
        width={size || '1rem'}
        className={className || ''}
        height={size || '1rem'}
        viewBox='0 0 29 22'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect className='top' width='29' height='2' fill={color || '#898989'} />
        <rect
          className='mid'
          y='10'
          width='29'
          height='2'
          fill={color || '#898989'}
        />
        <rect
          className='bot'
          y='20'
          width='29'
          height='2'
          fill={color || '#898989'}
        />
      </svg>
    </Fragment>
  )
}

export default HamburgerIcon
