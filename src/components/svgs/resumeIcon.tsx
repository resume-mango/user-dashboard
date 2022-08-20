import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
  style?: React.CSSProperties
}
const ResumeIcon = ({ size, color, className, style }: IconProps) => {
  return (
    <Fragment>
      <svg
        width={size || '1rem'}
        className={className || ''}
        height={size || '1rem'}
        style={style}
        viewBox="0 0 14 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.5 0H13.5L14 0.5V10.5L13.5 11H0.5L0 10.5V0.5L0.5 0ZM1 1V10H13V1H1ZM3 3H11V4H3V3ZM9 5H3V6H9V5ZM3 7H7V8H3V7Z"
          fill={color || '#898989'}
        />
      </svg>
    </Fragment>
  )
}

export default ResumeIcon
