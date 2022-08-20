import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
}
const PersonIcon = ({ size, color, className }: IconProps) => {
  return (
    <Fragment>
      <svg
        width={size || '1rem'}
        className={className || ''}
        height={size || '1rem'}
        viewBox='0 0 34 34'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M26.6213 24.3209C22.1633 22.6968 20.7381 21.326 20.7381 18.3907C20.7381 16.6293 22.1989 15.4877 22.6968 13.978C23.1947 12.4683 23.4828 10.6809 23.7222 9.38074C23.9616 8.08055 24.0568 7.57767 24.1869 6.19234C24.3462 4.46341 23.1887 0 17 0C10.8131 0 9.65201 4.46341 9.81478 6.19234C9.945 7.57767 10.0407 8.08061 10.2796 9.38074C10.5185 10.6809 10.8037 12.4682 11.3013 13.978C11.7989 15.4878 13.2617 16.6293 13.2617 18.3907C13.2617 21.326 11.8366 22.6968 7.37865 24.3209C2.90448 25.9485 0 27.5536 0 28.6875V34H34V28.6875C34 27.5554 31.0937 25.9503 26.6213 24.3209Z'
          fill={color || '#898989'}
        />
      </svg>
    </Fragment>
  )
}

export default PersonIcon
