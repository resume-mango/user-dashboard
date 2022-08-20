import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
  style?: React.CSSProperties
}
const ClockIcon = ({ size, color, className, style }: IconProps) => {
  return (
    <Fragment>
      <svg
        style={style}
        width={size || '1rem'}
        height={size || '1rem'}
        className={className || ''}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={color || '#898989'}
          d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12S17.5 2 12 2M7.7 15.5L7 14.2L11 11.9V7H12.5V12.8L7.7 15.5Z"
        />
      </svg>
    </Fragment>
  )
}

export default ClockIcon
