import React, { Fragment } from 'react'
import styled, { keyframes } from 'styled-components'

interface ICircularProgress {
  size?: number
  progress?: number
  trackWidth?: number
  trackColor?: string
  indicatorWidth?: number
  indicatorColor?: string
  indicatorCap?: 'inherit' | 'round' | 'butt' | 'square' | undefined
  spinnerMode?: boolean
  spinnerSpeed?: number
}
const CircularProgress = (props: ICircularProgress) => {
  const {
    size = 30,
    progress = 0,
    trackWidth = 3,
    trackColor = `#eee`,
    indicatorWidth = 3,
    indicatorColor = `rgba(240, 132, 56, 1)`,
    indicatorCap = `round`,
    spinnerMode = false,
    spinnerSpeed = 1,
  } = props

  const center = size / 2,
    radius =
      center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth),
    dashArray = 2 * Math.PI * radius,
    dashOffset = dashArray * ((100 - progress) / 100)

  return (
    <Fragment>
      <CircleIcon style={{ width: size, height: size }}>
        <circle
          className={`track ${spinnerMode ? 'spinner' : ''}`}
          cx={center}
          cy={center}
          fill="transparent"
          r={radius}
          stroke={trackColor}
          strokeWidth={trackWidth}
        />
        <circle
          className={`indicator ${spinnerMode ? 'indicator-spinner' : ''}`}
          style={{ animationDuration: (spinnerSpeed * 1000).toString() }}
          cx={center}
          cy={center}
          fill="transparent"
          r={radius}
          stroke={indicatorColor}
          strokeWidth={indicatorWidth}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          strokeLinecap={indicatorCap}
        />
      </CircleIcon>
    </Fragment>
  )
}

export default CircularProgress

const Spinner = keyframes`

  0% {
    transform: rotate(0)
  }
  100% {
    transform: rotate(360deg)
  }

`

const CircleIcon = styled.svg`
  transform: rotate(-90deg);
  .indicator-spinner {
    animation: ${Spinner} 1000ms linear infinite;
    transform-origin: center;
  }
`
