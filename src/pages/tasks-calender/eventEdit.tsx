import React, { Fragment, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import styled from 'styled-components'
import Input from '../../components/form/Input'
import ColorPicker from '../../components/form/colorPicker'
import { Link, useHistory, useParams } from 'react-router-dom'
import CrossIcon from '../../components/svgs/cross'
import { Spinner } from '../../styled/loader'
import { useQueryClient } from 'react-query'
import dayjs from 'dayjs'
import { apiCreateEvent, apiUpdateEvent } from '../../apis/calendar'
import { useNotify } from '../../contexts/notify'
import FormButton from '../../components/ui/FormButton'
import { FormButtonWrapper } from '../../styled/form'
import { validateCalendarSchema } from '../../validations/calendar'
import { yupResolver } from '@hookform/resolvers/yup'
import useExitPrompt from '../../hooks/useExitPromt'
import RichTextEditor from '../../components/form/RichTextEditor'
import { fetchCalendarEvents } from '../../helpers/getCalendar'
import RouterPrompt from '../../components/routerPrompt'

interface IEvent {
  summary: string
  description: any
  location: string
  startDate: Date | string
  startTime: string
  endDate: Date | string
  endTime: string
  color: string
}

interface IProps {
  location: {
    state: any
  }
}

const options = [
  { id: 1, color: '#7986cb' },
  { id: 2, color: '#33b679' },
  { id: 3, color: '#8e24aa' },
  { id: 4, color: '#e67c73' },
  { id: 5, color: '#f6c026' },
  { id: 6, color: '#f5511d' },
  { id: 7, color: '#039be5' },
  { id: 8, color: '#616161' },
  { id: 9, color: '#3f51b5' },
  { id: 10, color: '#0b8043' },
  { id: 11, color: '#d60000' },
]

const EventEdit: React.FC<IProps> = ({ location }) => {
  const [prevData, setPrevData] = useState<any>(null)
  const queryClient = useQueryClient()
  const history = useHistory()
  const { type } = useParams<{ type: 'edit' | 'new' }>()
  const initialData = location.state && location.state.data
  const initialDate =
    location.state && dayjs(location.state.date).format('YYYY/MM/DD')
  const initialYear = dayjs(initialDate).format('YYYY')
  const { setNotify } = useNotify()
  const { showExitPrompt, setShowExitPrompt } = useExitPrompt(false)
  useEffect(() => {
    const getData = queryClient.getQueryData(['calendar', initialYear])
    if (!getData && type !== 'new') {
      if (initialDate) {
        history.push(`/calendar/view/${initialDate}`)
      } else {
        history.push(`/calendar/view/${dayjs().format('YYYY/MM/DD')}`)
      }
      return
    }
    setPrevData(getData || [])
    return () => {
      setShowExitPrompt(false)
    }
  }, [])

  useEffect(() => {
    if (type !== 'new' && !initialData)
      history.push(`/calendar/view/${initialDate}`)
    return
  }, [initialData])

  const startT =
    initialData && initialData.start && initialData.start.dateTime
      ? dayjs(initialData.start.dateTime).format('HH:mm')
      : undefined

  const endT =
    initialData && initialData.end && initialData.end.dateTime
      ? dayjs(initialData.end.dateTime).format('HH:mm')
      : undefined

  const startD =
    initialData && initialData.start
      ? (initialData.start.dateTime &&
          dayjs(initialData.start.dateTime).format('YYYY-MM-DD')) ||
        (initialData.start.date && initialData.start.date)
      : dayjs().format('YYYY-MM-DD')

  const endD =
    initialData && initialData.end
      ? (initialData.end.dateTime &&
          dayjs(initialData.end.dateTime).format('YYYY-MM-DD')) ||
        (initialData.end.date && initialData.end.date)
      : dayjs().format('YYYY-MM-DD')

  const defaultValues = {
    summary: (initialData && initialData.summary) || '',
    location: (initialData && initialData.location) || '',
    startDate: startD,
    startTime: startT,
    endDate: endD,
    endTime: endT,
    color: (initialData && initialData.colorId) || 1,
    description: (initialData && initialData.description) || '',
  }

  const methods = useForm<IEvent>({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(validateCalendarSchema),
  })

  const {
    handleSubmit,
    watch,
    setValue,
    trigger,
    clearErrors,
    reset,
    formState: { isSubmitting, isDirty, isValid, isSubmitted },
  } = methods

  const watching = watch(['startDate', 'endDate', 'startTime', 'endTime'])

  const handleClear = (type: 'start' | 'end') => {
    if (type === 'start') {
      setValue('startDate', '')
      setValue('startTime', '')
      clearErrors('startTime')
    } else {
      setValue('endDate', '')
      setValue('endTime', '')
      clearErrors(['endDate', 'endTime'])
    }
  }

  useEffect(() => {
    const subscription = watch(() => {
      trigger(['startDate', 'endDate', 'startTime', 'endTime'])
    })
    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    if (isDirty || !isValid || isSubmitting) {
      setShowExitPrompt(true)
    } else {
      setShowExitPrompt(false)
    }
  }, [isValid, isDirty, isSubmitting])

  const form = async (data: IEvent) => {
    const startTime = data.startTime && data.startTime.split(':')
    const endTime = data.endTime && data.endTime.split(':')

    const start = {
      ...(data.startDate &&
        !data.startTime && {
          date: dayjs(data.startDate).format('YYYY-MM-DD'),
        }),
      ...(data.startDate &&
        data.startTime && {
          dateTime: dayjs(data.startDate)
            .hour(parseInt(startTime[0]))
            .minute(parseInt(startTime[1]))
            .toISOString(),
        }),
    }

    const end = {
      ...(data.endDate &&
        !data.endTime && { date: dayjs(data.endDate).format('YYYY-MM-DD') }),
      ...(data.endDate &&
        data.endTime && {
          dateTime: dayjs(data.endDate)
            .hour(parseInt(endTime[0]))
            .minute(parseInt(endTime[1]))
            .toISOString(),
        }),
    }

    const regex = /(<([^>]+)>)/gi
    const hasTextinDescription = !!data.description.replace(regex, '').length

    const newData = {
      summary: data.summary,
      location: data.location,
      start,
      end,
      description: hasTextinDescription ? data.description : '',
      colorId: data.color,
    }

    const currYear = dayjs(data.startDate).format('YYYY')

    let success = false

    if (!initialData || type === 'new') {
      const { data: resData, error } = await apiCreateEvent(newData)
      if (resData) {
        if (currYear === initialYear) {
          prevData.push(resData)
          queryClient.setQueryData(['calendar', initialYear], prevData)
        } else {
          let newQueryData: any = queryClient.getQueryData([
            'calendar',
            currYear,
          ])
          if (!newQueryData) {
            newQueryData = await queryClient.fetchQuery(
              ['calendar', currYear],
              () => fetchCalendarEvents(currYear as any)
            )
          }
          newQueryData.push(resData)
          queryClient.setQueryData(['calendar', currYear], newQueryData)
        }
        success = true
      } else {
        setNotify({
          type: 'danger',
          heading: 'Err!',
          message: 'Failed to add event',
        })
        // console.log(error)
        success = false
      }
    } else {
      const { data: resData, error } = await apiUpdateEvent({
        id: initialData.id,
        ...newData,
      })
      if (resData) {
        const find = prevData.findIndex(
          (item: any) => item.id === initialData.id
        )
        if (currYear === initialYear) {
          prevData.splice(find, 1, resData)

          queryClient.setQueryData(['calendar', initialYear], prevData)
        } else {
          prevData.splice(find, 1)
          queryClient.setQueryData(['calendar', initialYear], prevData)
          let newQueryData: any = queryClient.getQueryData([
            'calendar',
            currYear,
          ])
          if (!newQueryData) {
            newQueryData = await queryClient.fetchQuery(
              ['calendar', currYear],
              () => fetchCalendarEvents(currYear as any)
            )
          }
          newQueryData.push(resData)
          queryClient.setQueryData(['calendar', currYear], newQueryData)
        }
        success = true
      } else {
        setNotify({
          type: 'danger',
          heading: 'Err!',
          message: 'Failed to update event',
        })
        success = false

        // console.log(error)
      }
    }

    if (success) {
      reset(
        {},
        {
          keepValues: true,
        }
      )
    }
    return
  }

  if (type !== 'new' && !initialData)
    return (
      <div className="align-center" style={{ height: '100vh' }}>
        <Spinner size="40px" type="primary" />
      </div>
    )

  return (
    <Fragment>
      <RouterPrompt show={showExitPrompt} setShow={setShowExitPrompt} />

      <FlexWrapper>
        <Link data-test-id="go-back" to={`/calendar/view/${initialDate}`}>
          <CrossIcon size="1.2rem" />
        </Link>
        <h1>{type !== 'new' ? 'Edit Event' : 'New Event'}</h1>
      </FlexWrapper>
      <Wrapper>
        <FormProvider {...methods}>
          <form id="claendarForm" onSubmit={handleSubmit(form)}>
            <div className="mb-2">
              <Input name="summary" label="Title" />
            </div>
            <div className="mb-2">
              <Input name="location" label="Location" />
            </div>
            <Grid columns={'50% 30% 20%'} className="mb-2">
              <div>
                <Input name="startDate" label="Start date" type="date" />
              </div>
              <div>
                <Input name="startTime" label="Start time" type="time" />
              </div>
              <StyledClear>
                {(watching[0] || watching[2]) && (
                  <span onClick={() => handleClear('start')}>Clear</span>
                )}
              </StyledClear>
              <div>
                <Input name="endDate" label="End date" type="date" />
              </div>
              <div>
                <Input name="endTime" label="End time" type="time" />
              </div>
              <StyledClear>
                {(watching[1] || watching[3]) && (
                  <span onClick={() => handleClear('end')}>Clear</span>
                )}
              </StyledClear>
            </Grid>
            <div className="mb-2">
              <ColorPicker name={'color'} options={options} />
            </div>

            <div className="mb-2">
              <label>Description</label>
              <RichTextEditor name={'description'} />
            </div>
          </form>
        </FormProvider>
        <FormButtonWrapper>
          <FormButton
            btnType="primary"
            size="lg"
            width="150px"
            type="submit"
            disabled={isSubmitting || !isValid || !isDirty}
            loading={isSubmitting}
            form="claendarForm"
          >
            {initialData || isSubmitted ? 'Update' : 'Create'}
          </FormButton>
        </FormButtonWrapper>
      </Wrapper>
    </Fragment>
  )
}

export default EventEdit

const Wrapper = styled.div`
  padding: 1rem;
  max-width: 700px;
`
const Grid = styled.div<{ columns: string }>`
  display: grid;
  grid-template-columns: ${({ columns }) => columns};
  grid-gap: 1rem;
  align-items: top;
`
const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 1rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid #e7e7e7;
  h1 {
    margin-bottom: 0;
  }
  a {
    margin-right: 1.5rem;
  }
`
const StyledClear = styled.div`
  display: flex;
  align-items: flex-start;

  span {
    display: inline-flex;
    margin-top: 2rem;
    font-size: 0.875rem;
    cursor: pointer;
    background-color: #eee;
    padding: 0.3rem 1rem;
    border-radius: 6px;
    transition: background-color 300ms ease-in-out;
    &:hover {
      background-color: #ddd;
    }
  }
`
