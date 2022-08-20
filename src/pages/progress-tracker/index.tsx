import React, { Fragment, useState } from 'react'
import {
  DragDropContext,
  DragStart,
  DragUpdate,
  DropResult,
} from 'react-beautiful-dnd'
import { useHistory } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import styled, { keyframes } from 'styled-components'
import CheckIcon1 from '../../components/svgs/check1'
import Confirmation from '../../components/ui/confirmation'
import DashPageHeader from '../../components/ui/dashPageHeader'
import {
  ProgressTrackerProvider,
  useProgressTracker,
} from '../../contexts/progressTracker'
import { Button } from '../../styled/button'
import {
  SK_Heading,
  SK_Thumbnail,
  SK_Wrapper,
  Spinner,
} from '../../styled/loader'
import DraggableElement from './drag-element'
import TaskModal from './TaskModal'
import {
  progressTrackerHandleDragEnd,
  progressTrackerHandleDragStart,
  progressTrackerHandleDragUpdate,
} from '../../helpers/progressTrackerHelpers'

const ProgressTracker = () => {
  return (
    <ProgressTrackerProvider>
      <ProgressTrackerComponent />
    </ProgressTrackerProvider>
  )
}

const ProgressTrackerComponent = () => {
  const [placeholderProps, setPlaceholderProps] = useState({})

  const {
    showModal,
    setShowModal,
    setModalAction,
    setTracker,
    data,
    isLoading,
    isError,
    setReqPosChange,
    deleteItem,
    setDeleteItem,
    isDeleting,
    handleDeleteTracker,
    isPosUpdating,
  } = useProgressTracker()

  const lists = ['applied', 'responded', 'interview', 'offers', 'rejected']
  const queryAttr = 'data-rbd-drag-handle-draggable-id'
  const history = useHistory()

  const handleCreate = () => {
    setTracker('')
    setModalAction('create')
    setShowModal(true)
  }

  const getDraggedDom = (draggableId: string) => {
    const domQuery = `[${queryAttr}='${draggableId}']`
    const draggedDOM = document.querySelector(domQuery)

    return draggedDOM
  }
  const handleDragUpdate = (event: DragUpdate) => {
    const result = progressTrackerHandleDragUpdate(event, getDraggedDom)
    if (!result) return
    setPlaceholderProps({
      clientHeight: result.clientHeight,
      clientWidth: result.clientWidth,
      clientY: result.clientY,
      clientX: parseFloat(
        window.getComputedStyle(result.draggedDOM.parentNode as any).paddingLeft
      ),
    })
  }

  const handleDragStart = (event: DragStart) => {
    const result = progressTrackerHandleDragStart(event, getDraggedDom)
    if (!result) return
    setPlaceholderProps({
      clientHeight: result.clientHeight,
      clientWidth: result.clientWidth,
      clientY: result.clientY,
      clientX: parseFloat(
        window.getComputedStyle(result.draggedDOM.parentNode as any).paddingLeft
      ),
    })
  }

  const handleDragEnd = (result: DropResult) => {
    setPlaceholderProps({})

    progressTrackerHandleDragEnd(data, result)
    setReqPosChange(((prevState: number) => prevState + 1) as any)
  }

  return (
    <Fragment>
      <CSSTransition
        in={isPosUpdating}
        timeout={{
          enter: 200,
          exit: 5000,
        }}
      >
        <Loader>
          {isPosUpdating ? (
            <Fragment>
              <Spinner type="primary" size="1.5rem" />
              <LoadingDots color="#f08438">Updating</LoadingDots>
            </Fragment>
          ) : (
            <Fragment>
              <CheckIcon1 size="1.5rem" color="#f08438" />
              <p style={{ color: '#f08438', margin: '0 0.7rem' }}>Done</p>
            </Fragment>
          )}
        </Loader>
      </CSSTransition>

      <Confirmation
        title="Delete"
        msg="Are you sure?"
        show={Object.keys(deleteItem).length > 0 ? true : false}
      >
        <Button
          btnType="primary"
          size="lg"
          onClick={() => setDeleteItem({})}
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          btnType="ghost"
          size="lg"
          onClick={() =>
            deleteItem &&
            Object.keys(deleteItem).length > 0 &&
            handleDeleteTracker(deleteItem as any)
          }
          disabled={isDeleting}
        >
          {isDeleting ? <Spinner size="1.2rem" type="white" /> : 'Delete'}
        </Button>
      </Confirmation>

      <DashPageHeader title="Progress tracker" customBtns={true}>
        <Button
          btnType="primary"
          size="sm"
          disabled={isLoading || isError}
          onClick={() => handleCreate()}
        >
          Create New Card
        </Button>

        <Button
          btnType="ghost"
          size="sm"
          disabled={isLoading || isError}
          onClick={() => history.push('/resumes/new')}
        >
          Create Resume
        </Button>
      </DashPageHeader>
      {isError ? (
        <div className="align-center" style={{ height: '30vh' }}>
          <h3>Failed to load progress tracker!</h3>
        </div>
      ) : isLoading ? (
        <Sekeleton>
          <SK_Wrapper>
            {[...Array(5)].map((item, i) => (
              <div key={i}>
                <SK_Heading />
                <SK_Thumbnail />
              </div>
            ))}
          </SK_Wrapper>
        </Sekeleton>
      ) : (
        <Fragment>
          {showModal && <TaskModal />}
          <DragDropContext
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            onDragUpdate={handleDragUpdate}
          >
            <ListGrid id="drag-container">
              {data &&
                lists.map((listKey) => (
                  <DraggableElement
                    elements={data[listKey] as any}
                    key={listKey}
                    name={listKey}
                    placeholderProps={placeholderProps}
                  />
                ))}
            </ListGrid>
          </DragDropContext>
        </Fragment>
      )}
    </Fragment>
  )
}

export default ProgressTracker

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 20%);
  padding: 1.5rem 1rem;
  margin-bottom: 1rem;
  width: 100%;
  flex: 1;

  @media (max-width: 900px) {
    grid-template-columns: repeat(5, 1fr);
    overflow-x: scroll;
    margin-bottom: 1.5rem;
  }
`
const Sekeleton = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex: 1;

  ${SK_Wrapper} {
    display: flex;
    grid-gap: 1rem;
    margin-bottom: 1rem;
    width: 100%;
    height: 100%;
    flex: 1;
    padding: 1.5rem;

    div {
      display: flex;
      flex-direction: column;
      width: 100%;
      ${SK_Heading} {
        height: 40px;
        margin-bottom: 1rem;
      }
      ${SK_Thumbnail} {
        width: 100%;
        height: 100%;
      }
    }
  }
  @media (max-width: 900px) {
    ${SK_Wrapper} {
      overflow-x: scroll;
      div {
        width: 275px;
      }
    }
  }
`
const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 0 0.5rem;
  height: 50px;
  min-width: 50px;
  transition: ease 300ms;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 4px 0px 20px 0px #ddd;
  border: 1px solid #eee;
  position: fixed;
  right: 40px;
  bottom: 40px;
  opacity: 0;
  visibility: hidden;
  z-index: 1;
  &.enter-done,
  &.enter-active,
  &.exit-active {
    opacity: 1;
    visibility: visible;
  }
  &.exit-done {
    opacity: 0;
    visibility: hidden;
  }
`

const dots = (color: string) => keyframes`
   0%, 20% {
    color: rgba(0,0,0,0);
    text-shadow:
      .25em 0 0 rgba(0,0,0,0),
      .5em 0 0 rgba(0,0,0,0);}
  40% {
    color: ${color};
    text-shadow:
      .25em 0 0 rgba(0,0,0,0),
      .5em 0 0 rgba(0,0,0,0);}
  60% {
    text-shadow:
      .25em 0 0 ${color},
      .5em 0 0 rgba(0,0,0,0);}
  80%, 100% {
    text-shadow:
      .25em 0 0 ${color},
      .5em 0 0 ${color};
    }
    
`

const LoadingDots = styled.p<{ color: string }>`
  display: inline-flex;
  margin: 0 0.7rem;
  color: ${({ theme, color }) => (color ? color : theme.colors.dark)};
  &:after {
    content: '.';
    margin-left: 0.1rem;
    animation: ${({ theme, color }) => dots(color ? color : theme.colors.dark)}
      1s steps(5, end) infinite;
  }
`
