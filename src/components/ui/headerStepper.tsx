import React, {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useViewport } from '../../contexts/viewPort'
import logolg from '../../public/logo/resume-mango-full-logo.png'
import logosm from '../../public/logo/resume-mango-logo.png'
import CheckIcon1 from '../svgs/check1'
import CrossIcon from '../svgs/cross'
import WarningIcon from '../svgs/warning'

interface IStepper {
  current: number
  max: number
  backRoute: string
  children: ReactNode
}

interface IStep {
  name: string
  isValid: boolean
  isError: boolean
  current?: number
  max?: number
  index?: number
  backRoute?: string
  onClick: () => void
}

const HeaderStepper = ({ current, max, backRoute, children }: IStepper) => {
  const [width, setWidth] = useState(0)
  const ref = useRef<any>(null)

  const childrenWithProps = Children.map(children, (child, i) => {
    if (isValidElement(child)) {
      return cloneElement(child as ReactElement, {
        backRoute,
        current: current,
        index: i + 1,
        max: max,
      })
    }
    return child
  })

  useEffect(() => {
    if (
      ref &&
      ref.current &&
      current > 0 &&
      current <= ref.current.children.length
    ) {
      const stepEls = ref.current.querySelectorAll('.step')
      const currEl = stepEls[current - 1]
      const rect = currEl.getBoundingClientRect()
      const elWidth =
        current === stepEls.length
          ? ref.current.parentElement.clientWidth
          : rect.left + rect.width

      setWidth(elWidth)
    }
  }, [ref, current])

  return (
    <Fragment>
      <Wrapper>
        <Header>
          <Stepper max={max} ref={ref}>
            {childrenWithProps}
          </Stepper>
        </Header>
        <Progress>
          <span style={{ width: `${width}px` }} />
        </Progress>
      </Wrapper>
    </Fragment>
  )
}

const Step: React.FC<IStep> = ({
  name,
  isValid,
  isError,
  current,
  max,
  index,
  backRoute,
  onClick,
}) => {
  const history = useHistory()
  const { width } = useViewport()
  const size = width < 1000 ? 1 : width < 1300 ? 1.2 : 1.4
  return (
    <StepWrapper active={index && current ? index <= current : false}>
      {index === 1 && (
        <NavLink to="/">
          <LogoWrapper>
            <img src={width > 1200 ? logolg : logosm} alt="resume-mango" />
          </LogoWrapper>
        </NavLink>
      )}
      <StepItem className="step">
        <div
          onClick={onClick}
          style={{ cursor: 'pointer', userSelect: 'none' }}
        >
          <p>
            Step {index} of {max}
          </p>
          <h2>
            {name}
            <Fragment>
              {isError && (
                <span>
                  <WarningIcon
                    size={`${size}rem`}
                    color="rgba(244, 67, 54, 1)"
                  />
                </span>
              )}
            </Fragment>
            {index && current && index <= current && (
              <Fragment>
                {isValid ? (
                  <span>
                    <CheckIcon1
                      size={`${size}rem`}
                      color="rgba(32, 192, 50, 1)"
                    />
                  </span>
                ) : null}
              </Fragment>
            )}
          </h2>
        </div>
      </StepItem>
      {index === max && (
        <CloseWrapper
          data-test-id="close-builder"
          onClick={() =>
            backRoute ? history.push(backRoute) : history.goBack()
          }
        >
          <CrossIcon size="1.2rem" />
        </CloseWrapper>
      )}
    </StepWrapper>
  )
}

HeaderStepper.Step = Step

export default HeaderStepper

const LogoWrapper = styled.div`
  cursor: pointer;
  user-select: none;
  width: fit-content;
  height: fit-content;
  @media (max-width: 1300px) {
    width: 175px;
    img {
      width: 100%;
    }
  }
  @media (max-width: 1200px) {
    display: flex;
    align-items: center;
    width: 57px;
  }
`
const CloseWrapper = styled.div`
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  width: 50px;
  height: auto;
  svg {
    margin: auto;
  }
  &:hover {
    svg {
      path {
        stroke: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`

const Wrapper = styled.div`
  background: rgba(22, 22, 22, 0.02);
  position: relative;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  &::before {
    content: '';
    display: block;
    background-color: #fff;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    z-index: -1;
  }
`

const Stepper = styled.div<{ max: number }>`
  display: grid;
  grid-template-columns: ${({ max }) => `repeat(${max || 1}, 1fr)`};
  align-items: center;
  width: 100%;
  justify-items: center;
`
const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 0.7rem;
`

const Progress = styled.div`
  width: 100%;
  display: block;
  background-color: rgba(196, 196, 196, 0.4);
  height: 10px;
  span {
    display: block;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.success};
    transition: 1s ease;
    transition-delay: 0.5s;
  }
`

const StepItem = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const StepWrapper = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  p {
    font-weight: bold;
    margin: 0;
    color: #878787;
  }
  h2 {
    display: flex;
    align-items: center;
    width: fit-content;
    font-size: 1.5rem;
    margin: 0;
    opacity: ${({ active }) => (active ? 1 : 0.34)};
    span {
      margin-left: 0.7rem;
      display: inline-flex;
    }
  }

  @media (max-width: 1300px) {
    h2 {
      font-size: 1.2rem;
    }
  }
  @media (max-width: 1000px) {
    p {
      font-size: 0.8rem;
    }
    h2 {
      font-size: 0.875rem;
    }
  }
`
