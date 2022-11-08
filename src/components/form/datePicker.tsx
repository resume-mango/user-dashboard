import dayjs from 'dayjs'
import React, { Fragment, useEffect, useState } from 'react'
import { useFormContext, useController } from 'react-hook-form'
import styled from 'styled-components'
import detectOutsideClick from '../../hooks/detectOutsideClick'
import DownArrowIcon from '../svgs/downArrow'

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

interface IInput {
  name: string
}

const DatePicker: React.FC<
  IInput &
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
> = ({ name, ...props }) => {
  const currYear = dayjs().format('YYYY')
  const [show, setShow] = useState<boolean>(false)
  const [year, setYear] = useState<string>(dayjs().format('YYYY'))
  const [month, setMonth] = useState<string | null>(dayjs().format('MMM'))
  const [inputVal, setInputVal] = useState('')
  const { isOutside, ref } = detectOutsideClick()
  const { control, trigger } = useFormContext()

  const {
    field: { onChange, onBlur, value },
  } = useController({
    name,
    control,
  })

  useEffect(() => {
    return setShow(false)
  }, [isOutside])

  useEffect(() => {
    return setInputVal(value)
  }, [])

  useEffect(() => {
    const triggerName = name.split('.', 3)
    trigger(triggerName.join('.'))
    return
  }, [value])

  const isNumeric = (num: any) =>
    (typeof num === 'number' ||
      (typeof num === 'string' && num.trim() !== '')) &&
    !isNaN(num as number)

  const detect = (e: any) => {
    const regex = new RegExp('([0-9]+)|([a-zA-Z]+)', 'g')

    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '')

    const arr = value.match(regex)

    const find = (arr: string[]) => {
      return (
        arr &&
        arr.reduce(
          (acc: any, curr: string) => {
            let val = curr
            if (!acc.mm) {
              if (isNumeric(val)) {
                let mm = parseInt(val.substring(0, 2))
                mm > 12 ? (mm = 12) : mm < 1 ? (mm = 1) : mm
                acc.mm = months[mm - 1]
                val = val.substring(mm.toString().length)
              } else {
                let mm = val.substring(0, 3)
                let find = months.filter((m) =>
                  m.toLowerCase().includes(mm.toLowerCase())
                )
                if (find && find.length > 0) {
                  acc.mm = find[0]
                } else {
                  mm = val.substring(0, 2)
                  find = months.filter((m) =>
                    m.toLowerCase().includes(mm.toLowerCase())
                  )
                  acc.mm = find[0]
                }
              }
            }
            if (!acc.yyyy) {
              if (isNumeric(curr) && val.length >= 4) {
                let yyyy = val.substring(0, 4)
                parseInt(yyyy) > 2099
                  ? (yyyy = currYear)
                  : parseInt(yyyy) < 1999
                  ? (yyyy = currYear)
                  : yyyy
                acc.yyyy = yyyy
              }
            }

            return acc
          },
          { mm: '', yyyy: '' }
        )
      )
    }
    const found = find(arr)
    if (found) {
      found.yyyy ? setYear(found.yyyy) : setYear(year)
      found.mm ? setMonth(found.mm) : setMonth('Jan')
    }
  }

  const handlePrev = () => {
    const prev = dayjs(year).subtract(1, 'year').format('YYYY')
    if (parseInt(prev) < 1999) return
    setYear(prev)
    setInputVal(`${month} ${prev}`)
    onChange(`${month} ${prev}`)
  }

  const handleNext = () => {
    const add = dayjs(year).add(1, 'year').format('YYYY')
    if (parseInt(add) > 2099) return
    setYear(add)
    setInputVal(`${month} ${add}`)
    onChange(`${month} ${add}`)
  }

  const handleValue = (month: string) => {
    setMonth(month)
    setInputVal(`${month} ${year}`)
    onChange(`${month} ${year}`)
    setShow(false)
  }

  const handleChange = (e: React.FocusEvent<HTMLInputElement>) => {
    detect(e)
    setInputVal(e.target.value)
  }

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      onChange('')
    } else {
      detect(e)
      if (month) {
        onChange(`${month} ${year}`)
        setInputVal(`${month} ${year}`)
      }
    }

    onBlur()
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.keyCode || e.which
    if (key === 13) {
      detect(e)
      if (month) {
        onChange(`${month} ${year}`)
        setInputVal(`${month} ${year}`)
      }
      setShow(false)
    }
  }

  return (
    <Fragment>
      <Wrapper ref={ref}>
        <input
          onClick={() => setShow(true)}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={inputVal}
          name={name}
          autoComplete="off"
          placeholder="Select Date"
          {...props}
        />
        {show && (
          <PickerWrapper>
            <YearWrapper>
              <div>
                <span
                  style={{ transform: 'rotateZ(90deg)' }}
                  onClick={handlePrev}
                >
                  <DownArrowIcon />
                </span>
              </div>
              <div>{year}</div>
              <div>
                <span
                  style={{ transform: 'rotateZ(270deg)' }}
                  onClick={handleNext}
                >
                  <DownArrowIcon />
                </span>
              </div>
            </YearWrapper>
            <MonthsWrapper>
              {months.map((item, i) => (
                <Months
                  key={i}
                  onClick={() => handleValue(item)}
                  active={month === item}
                >
                  {item}
                </Months>
              ))}
            </MonthsWrapper>
          </PickerWrapper>
        )}
      </Wrapper>
    </Fragment>
  )
}

export default DatePicker

const MonthsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
`
const Months = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  border-right: 1px solid #f2f5fa;
  border-bottom: 1px solid #f2f5fa;
  cursor: pointer;
  transition: all 300ms;
  color: ${({ theme, active }) => active && theme.colors.primary};
  background: ${({ theme, active }) => active && theme.shades.primary[4]};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.shades.primary[4]};
  }
`

const Wrapper = styled.div`
  position: relative;
`
const YearWrapper = styled.div`
  display: grid;
  height: 55px;
  grid-template-columns: 15% 70% 15%;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #f2f5fa;
  user-select: none;
  div {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    span {
      cursor: pointer;
      path {
        transition: all 300ms;
      }
      &:hover {
        path {
          stroke: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }
`
const PickerWrapper = styled.div`
  width: 230px;
  height: 200px;
  background-color: #fff;
  border: 1px solid rgba(0, 45, 112, 0.06);
  box-shadow: 4px 4px 5px rgba(0, 25, 88, 0.04);
  border-radius: 4px;
  position: absolute;
  z-index: 1;
`
