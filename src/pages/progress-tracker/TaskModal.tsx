import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { Fragment, useEffect, useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import styled from 'styled-components'
import Input from '../../components/form/Input'
import TextArea from '../../components/form/textarea'
import CrossIcon from '../../components/svgs/cross'
import DownArrowIcon from '../../components/svgs/downArrow'
import DustBinIcon from '../../components/svgs/dustbin'
import PenIcon from '../../components/svgs/pen'
import DropButton from '../../components/ui/DropButton'
import SubNavBar from '../../components/ui/subNavbar'
import { useNotify } from '../../contexts/notify'
import { useProgressTracker } from '../../contexts/progressTracker'
import { useViewport } from '../../contexts/viewPort'
import { Button } from '../../styled/button'
import { Spinner } from '../../styled/loader'
import { validateTracker } from '../../validations/progress_tracker'

const colors: any = {
  red: 'rgb(255 111 111)',
  green: 'rgb(82 255 140)',
  yellow: 'rgb(255 234 0)',
  blue: 'rgb(61 150 255)',
}

interface FormProps {
  job_title: string
  company: string
  salary: string
  deadline: string
  job_link: string
  job_location: string
  status: string
  color: string
  description: string
  logs: Array<{
    text: string
    created_at: string
    updated_at: string
  }>
}

const TaskModal = () => {
  const [currentTab, setCurrentTab] = useState(0)
  const [showStatus, setShowStatus] = useState(false)
  const [showColor, setShowColor] = useState(false)
  const [logEdit, setLogEdit] = useState(-1)
  const [logInput, setLogInput] = useState('')

  const queryClient = useQueryClient()

  const { width } = useViewport()

  const {
    data,
    tracker,
    modalAction,
    setShowModal,
    setTracker,
    setModalAction,
    setDeleteItem,
  } = useProgressTracker()
  const { setNotify } = useNotify()

  const defaultValues = {
    job_title: '',
    company: '',
    salary: '',
    deadline: '',
    job_link: '',
    job_location: '',
    description: '',
    status: 'applied',
    color: 'blue',
    logs: [],
  }
  const methods = useForm<FormProps>({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(validateTracker),
  })

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { isDirty, isValid, isSubmitting },
  } = methods

  const { fields, update, prepend, remove } = useFieldArray({
    control,
    name: 'logs',
  })

  useEffect(() => {
    const el = document.getElementById(`logs.${logEdit}.content`)
    if (!el) setLogEdit(-1)
    else el.focus()
    return
  }, [logEdit])

  useEffect(() => {
    if (Object.keys(tracker).length > 0) {
      if (tracker.deadline) {
        tracker.deadline = dayjs(tracker.deadline as string).format(
          'YYYY-MM-DD'
        )
      }

      reset(tracker, {
        keepErrors: false,
        keepDirty: false,
        keepIsSubmitted: false,
        keepTouched: false,
        keepIsValid: false,
        keepSubmitCount: false,
      })
    }
  }, [modalAction, tracker])

  const handleColor = (color: string) => {
    setValue('color', color, {
      shouldDirty: true,
      shouldValidate: true,
    })
    setShowColor(false)
  }

  const handleStatus = (status: string) => {
    setValue('status', status, {
      shouldDirty: true,
      shouldValidate: true,
    })
    setShowStatus(false)
  }

  const handleClose = () => {
    setShowModal(false)
    setTracker({})
    setModalAction('')
  }

  const handleLogEdit = (
    e: React.FocusEvent<HTMLParagraphElement>,
    index: number,
    data: any
  ) => {
    data.text = e.target.outerText
    data.updated_at = new Date(Date.now()).toISOString()
    update(index, data)
    setLogEdit(-1)
  }

  const handleLogAdd = () => {
    if (logInput.length <= 0) return
    prepend({
      text: logInput,
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString(),
    })
    setLogInput('')
  }

  const displayTime = (updatedTime: string) => {
    const diff = dayjs().diff(updatedTime, 'seconds')
    let output = 'just now'
    if (diff > 60) output = `${Math.floor(diff / 60)} min ago`
    if (diff > 3600) output = `${Math.floor(diff / 3600)} hour ago`
    if (diff > 3600 * 24) output = `${Math.floor(diff / (3600 * 24))} day ago`
    if (diff > 3600 * 24 * 30)
      output = `${Math.floor(diff / (3600 * 24 * 30))} month ago`
    if (diff > 3600 * 24 * 30 * 12)
      output = `${Math.floor(diff / (3600 * 24 * 30 * 12))} year ago`

    return output
  }
  const cacheNewTracker = (tracker: Record<string, any>) => {
    const trackers = { ...data } as any
    trackers[tracker.status].unshift(tracker)
    queryClient.setQueryData('progressTracker', trackers)
  }

  const createTracker = useMutation(
    (trackerData) => axios.post('/progress-tracker', trackerData),
    {
      onSuccess: (res: any) => {
        if (!res.data) return
        cacheNewTracker(res.data)
        setShowModal(false)
        setTracker({})
      },
      onError: ({ _response }) => {
        setNotify({
          type: 'danger',
          heading: 'Err!',
          message: 'Failed to create tracker',
        })
      },
    }
  )
  const updateTrackerCache = (newTracker: Record<string, any>) => {
    const trackers = { ...data } as any
    const list = trackers[tracker.status]
    if (!list) return
    const index = list.findIndex(
      (item: Record<string, any>) => item._id === tracker._id
    )
    if (index === -1) return

    if (newTracker.status !== tracker.status) {
      if (tracker) {
        list.splice(index, 1)
        trackers[newTracker.status].unshift(newTracker)
        queryClient.setQueryData('progressTracker', trackers)
      }
    } else {
      list.splice(index, 1, newTracker)
      queryClient.setQueryData('progressTracker', trackers)
    }
  }

  const updateTracker = useMutation(
    (trackerData) => axios.patch('/progress-tracker', trackerData),
    {
      onSuccess: (res) => {
        updateTrackerCache(res.data as Record<string, any>)
        setShowModal(false)
        setTracker({})
      },
      onError: ({ _response }) => {
        setNotify({
          type: 'danger',
          heading: 'Err!',
          message: 'Failed to update tracker',
        })
      },
    }
  )

  const submitForm = async (data: any) => {
    if (modalAction === 'create') {
      return createTracker
        .mutateAsync(data)
        .then((_val) => true)
        .catch((_err) => false)
    } else if (modalAction === 'edit') {
      data.id = tracker._id
      data.oldStatus = tracker.status
      // updateTracker.mutate(data)
      return updateTracker
        .mutateAsync(data)
        .then((_val) => true)
        .catch((_err) => false)
    }
  }

  const handleSave = () => {
    handleSubmit(submitForm)()
  }

  const handleDelete = () => {
    if (Object.keys(tracker).length > 0 && tracker._id && tracker.status) {
      setShowModal(false)
      setTracker({})
      setDeleteItem({
        id: tracker._id as string,
        status: tracker.status as string,
      })
    }
  }

  const currentColor: any = watch('color')
  const currentStatus: any = watch('status')
  const currentCompany: any = watch('company')
  const currentJob: any = watch('job_title')

  const company = <Input name="company" label="Company" />
  const job_title = <Input name="job_title" label="Job Title" />
  const salary = <Input name="salary" label="Salary" />
  const deadline = <Input name="deadline" type="date" label="Deadline" />
  const job_link = <Input name="job_link" label="Job Link" />
  const location = <Input name="job_location" label="Location" />

  const colorPicker = (
    <div>
      <label>Color</label>
      <CustomDropBtn
        vertical="bottom"
        horizontal="left"
        show={showColor}
        setShow={setShowColor}
        height="48px"
      >
        <DropButton.Button>
          <Pallette color={colors[currentColor]}>{currentColor}</Pallette>
          <DownArrowIcon />
        </DropButton.Button>
        <DropButton.Item>
          <a onClick={() => handleColor('yellow')}>
            <Pallette color={colors.yellow}>Yellow</Pallette>
          </a>
        </DropButton.Item>
        <DropButton.Item>
          <a onClick={() => handleColor('red')}>
            <Pallette color={colors.red}>Red</Pallette>
          </a>
        </DropButton.Item>
        <DropButton.Item>
          <a onClick={() => handleColor('green')}>
            <Pallette color={colors.green}>Green</Pallette>
          </a>
        </DropButton.Item>
        <DropButton.Item>
          <a onClick={() => handleColor('blue')}>
            <Pallette color={colors.blue}>Blue</Pallette>
          </a>
        </DropButton.Item>
      </CustomDropBtn>
    </div>
  )

  const statusSelect = (
    <CustomDropBtn
      vertical="top"
      horizontal="left"
      show={showStatus}
      setShow={setShowStatus}
      height="40px"
    >
      <DropButton.Button>
        {currentStatus}
        <DownArrowIcon />
      </DropButton.Button>
      <DropButton.Item>
        <a onClick={() => handleStatus('applied')}>Applied </a>
      </DropButton.Item>
      <DropButton.Item>
        <a onClick={() => handleStatus('responded')}>responded </a>
      </DropButton.Item>
      <DropButton.Item>
        <a onClick={() => handleStatus('interview')}>interview </a>
      </DropButton.Item>
      <DropButton.Item>
        <a onClick={() => handleStatus('offers')}>offers </a>
      </DropButton.Item>
      <DropButton.Item>
        <a onClick={() => handleStatus('rejected')}>rejected </a>
      </DropButton.Item>
    </CustomDropBtn>
  )

  return (
    <Fragment>
      <Modal data-test-id="tracker-popup">
        <Wrapper>
          <FormProvider {...methods}>
            <CloseBtn onClick={() => handleClose()}>
              <CrossIcon size="1rem" />
            </CloseBtn>
            <div className="mb-2">
              <h2
                className={`space-around truncate`}
                style={width <= 480 ? { marginBottom: '1rem' } : {}}
              >
                {currentJob ? currentJob : 'Untitled'}
                {currentCompany ? `(${currentCompany})` : '(Company)'}
              </h2>
              <SubNavBar>
                <SubNavBar.Link>
                  <a
                    className={currentTab === 0 ? 'active' : ''}
                    onClick={() => setCurrentTab(0)}
                  >
                    Overview
                  </a>
                </SubNavBar.Link>
                <SubNavBar.Link>
                  <a
                    className={currentTab === 1 ? 'active' : ''}
                    onClick={() => setCurrentTab(1)}
                  >
                    Notes
                  </a>
                </SubNavBar.Link>
                <SubNavBar.Link>
                  <a
                    className={currentTab === 2 ? 'active' : ''}
                    onClick={() => setCurrentTab(2)}
                  >
                    Log activity
                  </a>
                </SubNavBar.Link>
              </SubNavBar>
            </div>
            <div className="space-around">
              {currentTab === 0 ? (
                <Fragment>
                  {width > 700 ? (
                    <Fragment>
                      <Grid col={'repeat(3, 1fr)'} className="mb-1">
                        {company}
                        {job_title}
                        {salary}
                      </Grid>
                      <Grid col={'1fr 2fr'} className="mb-1">
                        {deadline}

                        {job_link}
                      </Grid>
                      <Grid col={'2fr 1fr'} className="mb-3">
                        {location}
                        {colorPicker}
                      </Grid>
                    </Fragment>
                  ) : width <= 700 && width > 400 ? (
                    <Fragment>
                      <Grid col={'repeat(2, 1fr)'} className="mb-1">
                        {company} {job_title}
                      </Grid>
                      <Grid col={'repeat(2, 1fr)'} className="mb-1">
                        {deadline}
                        {salary}
                      </Grid>
                      <div className="mb-1">{job_link}</div>
                      <div className="mb-1">{location}</div>
                      <Grid col={'repeat(2, 1fr)'} className="mb-3">
                        <div>
                          <label>Status</label>
                          {statusSelect}
                        </div>
                        {colorPicker}
                      </Grid>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <div className="mb-1">{company}</div>
                      <div className="mb-1">{job_title}</div>
                      <div className="mb-1">{deadline}</div>
                      <div className="mb-1">{salary}</div>

                      <div className="mb-1">{job_link}</div>
                      <div className="mb-1">{location}</div>
                      <div className="mb-1">
                        <label>Status</label>
                        {statusSelect}
                      </div>
                      <div className="mb-1">{colorPicker}</div>
                    </Fragment>
                  )}
                </Fragment>
              ) : currentTab === 1 ? (
                <TextArea
                  name="description"
                  label="Description"
                  className="mb-3"
                  style={{
                    minHeight: '150px',
                    resize: 'none',
                  }}
                  placeholder="Add a more detailed description..."
                />
              ) : currentTab === 2 ? (
                <Fragment>
                  <Grid
                    col={width > 480 ? 'auto 10%' : 'auto 50px'}
                    className="mb-1"
                    style={{
                      borderBottom: '1px solid rgba(196, 196, 196, 0.4)',
                      paddingBottom: '2rem',
                      gridGap: '1rem',
                    }}
                  >
                    <input
                      placeholder="Write a comment"
                      value={logInput}
                      onChange={(e) => setLogInput(e.target.value)}
                    />
                    <Button
                      btnType="ghost"
                      size="lg"
                      style={{ width: '100%', margin: 'auto', height: '48px' }}
                      onClick={handleLogAdd}
                    >
                      Add
                    </Button>
                  </Grid>

                  <LogWrapper id="log-wrapper">
                    {fields.map((item, i) => (
                      <Log key={i}>
                        <div>
                          <p
                            contentEditable={logEdit === i}
                            id={`logs.${i}.content`}
                            onBlur={(e) => handleLogEdit(e, i, item)}
                            suppressContentEditableWarning={true}
                          >
                            {item.text}
                          </p>
                          <p className="time">{displayTime(item.updated_at)}</p>
                        </div>
                        <div className="action-wrapper">
                          <span
                            data-test-id="log-edit"
                            onClick={() => setLogEdit(i)}
                          >
                            <PenIcon size="1.2rem" />
                          </span>
                          <span
                            data-test-id="log-delete"
                            onClick={() => remove(i)}
                          >
                            <DustBinIcon />
                          </span>
                        </div>
                      </Log>
                    ))}
                  </LogWrapper>
                  {fields.length > 0 && <Divider />}
                </Fragment>
              ) : null}
              {width > 700 ? (
                <Grid col="auto 25% 20%">
                  {currentTab === 0 && (
                    <Fragment>
                      {modalAction === 'edit' ? (
                        <Button
                          btnType="ghost"
                          size="lg"
                          onClick={() => handleDelete()}
                        >
                          Delete
                        </Button>
                      ) : (
                        <div />
                      )}
                      {statusSelect}
                    </Fragment>
                  )}
                  <Button
                    btnType="primary"
                    size="lg"
                    disabled={isSubmitting || !isDirty || !isValid}
                    onClick={handleSave}
                  >
                    {isSubmitting ? (
                      <Spinner size={'1.4rem'} type="white" />
                    ) : (
                      'Save'
                    )}
                  </Button>
                </Grid>
              ) : (
                <SMActionBtnWrapper>
                  {modalAction === 'edit' ? (
                    <Button
                      btnType="ghost"
                      size="lg"
                      onClick={() => handleDelete()}
                    >
                      Delete
                    </Button>
                  ) : (
                    <div />
                  )}

                  <Button
                    btnType="primary"
                    size="lg"
                    disabled={isSubmitting || !isDirty || !isValid}
                    onClick={handleSave}
                  >
                    {isSubmitting ? (
                      <Spinner size={'1.2rem'} type="white" />
                    ) : (
                      'Save'
                    )}
                  </Button>
                </SMActionBtnWrapper>
              )}
            </div>
          </FormProvider>
        </Wrapper>
      </Modal>
    </Fragment>
  )
}

export default TaskModal

const Modal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.shades.dark[3]};
`

const Wrapper = styled.div`
  max-width: 800px;
  width: 100%;
  background-color: #fff;
  padding-top: 3rem;
  padding-bottom: 3rem;
  position: relative;
  .space-around {
    padding-right: 2rem;
    padding-left: 2rem;
  }
  h2 {
    margin-bottom: 0;
    text-transform: capitalize;
  }
  @media (max-width: 700px) {
    overflow-y: auto;
    height: 100%;
    .space-around {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
`

const Pallette = styled.span<{ color: string }>`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  &:before {
    content: '';
    display: block;
    width: 25px;
    height: 25px;
    background-color: ${({ color }) => color};
    border-radius: 3px;
    margin-right: 0.5rem;
    border: 1px solid #eee;
  }
`
const CustomDropBtn = styled(DropButton)<{ height: string }>`
  width: 100%;
  button {
    background-color: #f4f5f7;
    width: 100%;
    height: ${({ height }) => height};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.2rem 0.8rem;
    border-radius: 6px;
    text-transform: capitalize;
  }
  a {
    text-transform: capitalize;
  }
  @media (max-width: 700px) {
    button {
      height: 48px;
    }
  }
`

const Grid = styled.div<{ col: string }>`
  display: grid;
  grid-template-columns: ${({ col }) => col};
  grid-column-gap: 1.5rem;
`

const LogWrapper = styled.div`
  margin-bottom: 1rem;
  max-height: 30vh;
  overflow-y: auto;
  padding-right: 1rem;
  @media (max-width: 700px) {
    overflow-y: unset;
    max-height: unset;
    padding-right: 0;
  }
`

const Divider = styled.div`
  display: block;
  margin-bottom: 2rem;
  background: rgba(196, 196, 196, 0.4);
  height: 1px;
`

const Log = styled.div`
  display: grid;
  grid-template-columns: auto 10%;
  grid-gap: 2rem;
  padding: 1rem;
  transition: ease 0.3s;

  &:hover {
    background-color: rgba(39, 39, 39, 0.1);
  }
  p {
    margin: 0;
  }
  .time {
    color: rgba(39, 39, 39, 0.4);
    font-size: 0.8rem;
  }
  .action-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      width: 100%;
      text-align: center;
      cursor: pointer;
      user-select: none;
      &:hover {
        svg {
          path {
            fill: ${({ theme }) => theme.colors.primary};
          }
        }
      }
    }
  }

  @media (max-width: 700px) {
    grid-template-columns: auto 60px;
    grid-gap: 1.5rem;
    padding: 1rem 0;
  }
`
const CloseBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    svg {
      path {
        stroke: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`
const SMActionBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  grid-gap: 1.5rem;
`
