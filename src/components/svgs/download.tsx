import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
}
const DownloadIcon = ({ size, color, className }: IconProps) => {
  return (
    <Fragment>
      <svg
        width={size || '1rem'}
        height={size || '1rem'}
        className={className || ''}
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M14.75 10.25V13.25C14.75 13.6478 14.592 14.0294 14.3107 14.3107C14.0294 14.592 13.6478 14.75 13.25 14.75H2.75C2.35218 14.75 1.97064 14.592 1.68934 14.3107C1.40804 14.0294 1.25 13.6478 1.25 13.25V10.25'
          stroke={color || '#898989'}
          strokeWidth='1.6'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M4.25 6.5L8 10.25L11.75 6.5'
          stroke={color || '#898989'}
          strokeWidth='1.6'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M8 10.25V1.25'
          stroke={color || '#898989'}
          strokeWidth='1.6'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </Fragment>
  )
}

export default DownloadIcon
