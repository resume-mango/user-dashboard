import { Fragment, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import detectOutsideClick from '../../hooks/detectOutsideClick'
import DownArrowIcon from '../svgs/downArrow'

interface IProps {
  name: string
  options: Array<{ id: number; color: string }>
}

const ColorPicker: React.FC<IProps> = ({ name, options }) => {
  const [show, setShow] = useState(false)

  const { isOutside, ref } = detectOutsideClick()

  const { register, watch } = useFormContext()

  const handleClick = () => {
    setShow(!show)
  }

  useEffect(() => {
    setShow(false)
  }, [isOutside])

  return (
    <Fragment>
      <Wrapper ref={ref} data-test-id="color-picker">
        <FlexWrapper>
          <p>Colour</p>
          <Toggle onClick={handleClick}>
            <span
              style={{
                background: options[watch(name) - 1].color,
              }}
            ></span>
            <DownArrowIcon size="1rem" />
          </Toggle>
        </FlexWrapper>
        <ColorWrapper open={show}>
          {options.map((item) => (
            <ColorRadio
              data-test-id={item.color}
              key={item.id}
              style={{ background: item.color }}
            >
              <input
                {...register(name)}
                type="radio"
                value={item.id}
                id={item.id.toString()}
                name={name}
              />
            </ColorRadio>
          ))}
        </ColorWrapper>
      </Wrapper>
    </Fragment>
  )
}

export default ColorPicker

const Wrapper = styled.div`
  display: inline-flex;
  position: relative;
`

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  p {
    font-size: 1rem;
    margin-right: 1rem;
  }
`
const Toggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #eee;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  width: 100px;
  cursor: pointer;
  span {
    height: 30px;
    width: 30px;
    display: block;
    border-radius: 50%;
  }
`

const ColorWrapper = styled.div<{ open: boolean }>`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 0.5rem;
  position: absolute;
  width: fit-content;
  height: fit-content;
  padding: 1rem;
  border-radius: 6px;
  background-color: #fff;
  top: 0;
  left: 75px;
  bottom: 0;
  margin: auto;
  box-shadow: 0 0 15px 2px rgb(0 0 0 / 20%);
  transition: transform ease-in-out 200ms, opacity ease-in-out 100ms,
    visibility ease-in-out 300ms;
  transform: translateX(${({ open }) => (open ? '120px' : 0)});
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  opacity: ${({ open }) => (open ? 1 : 0)};
  label {
    transition: opacity ease-in-out 500ms;
    opacity: ${({ open }) => (open ? 1 : 0)};
  }
`

const ColorRadio = styled.label`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  &:hover {
    transition: transform ease-in-out 300ms;
    transform: scale(1.1);
  }
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
`
