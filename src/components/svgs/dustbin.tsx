import React, { Fragment } from 'react'
interface IconProps {
  size?: string
  color?: string
  className?: string
}
const DustBinIcon = ({ size, color, className }: IconProps) => {
  return (
    <Fragment>
      <svg
        width={size || '1rem'}
        height={size || '1rem'}
        className={className || ''}
        viewBox='0 0 19 19'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M6.08594 2.13281H5.90625C6.00508 2.13281 6.08594 2.05195 6.08594 1.95312V2.13281H12.9141V1.95312C12.9141 2.05195 12.9949 2.13281 13.0938 2.13281H12.9141V3.75H14.5312V1.95312C14.5312 1.16025 13.8866 0.515625 13.0938 0.515625H5.90625C5.11338 0.515625 4.46875 1.16025 4.46875 1.95312V3.75H6.08594V2.13281ZM17.4062 3.75H1.59375C1.19619 3.75 0.875 4.07119 0.875 4.46875V5.1875C0.875 5.28633 0.955859 5.36719 1.05469 5.36719H2.41133L2.96611 17.1143C3.00205 17.8802 3.63545 18.4844 4.40137 18.4844H14.5986C15.3668 18.4844 15.9979 17.8824 16.0339 17.1143L16.5887 5.36719H17.9453C18.0441 5.36719 18.125 5.28633 18.125 5.1875V4.46875C18.125 4.07119 17.8038 3.75 17.4062 3.75ZM14.4257 16.8672H4.57432L4.03076 5.36719H14.9692L14.4257 16.8672Z'
          fill={color || '#898989'}
        />
      </svg>
    </Fragment>
  )
}

export default DustBinIcon
