import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
}
const SearchIcon = ({ size, color, className }: IconProps) => {
  return (
    <Fragment>
      <svg
        width={size || '1rem'}
        className={className || ''}
        height={size || '1rem'}
        viewBox='0 0 14 15'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M5.66732 11.0007C6.85064 11.0004 7.99985 10.6043 8.93198 9.87532L11.8627 12.806L12.8053 11.8633L9.87465 8.93265C10.604 8.00043 11.0004 6.85094 11.0007 5.66732C11.0007 2.72665 8.60798 0.333984 5.66732 0.333984C2.72665 0.333984 0.333984 2.72665 0.333984 5.66732C0.333984 8.60798 2.72665 11.0007 5.66732 11.0007ZM5.66732 1.66732C7.87332 1.66732 9.66732 3.46132 9.66732 5.66732C9.66732 7.87332 7.87332 9.66732 5.66732 9.66732C3.46132 9.66732 1.66732 7.87332 1.66732 5.66732C1.66732 3.46132 3.46132 1.66732 5.66732 1.66732Z'
          fill={color || '#898989'}
        />
      </svg>
    </Fragment>
  )
}

export default SearchIcon
