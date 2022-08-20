import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
}
const WarningIcon = ({ size, color, className }: IconProps) => {
  return (
    <Fragment>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        width={size || '1rem'}
        className={className || ''}
        height={size || '1rem'}
        fill={color || '#898989'}
      >
        <path d='M0 0h24v24H0z' fill='none' />
        <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z' />
      </svg>
    </Fragment>
  )
}

export default WarningIcon
