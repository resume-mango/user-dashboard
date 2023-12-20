import React, { Fragment, useState } from "react"
import {
  DragDropContext,
  DragStart,
  DragUpdate,
  DropResult,
} from "react-beautiful-dnd"
import styled from "styled-components"
import Confirmation from "../../../components/ui/confirmation"
import Loading from "../../../components/ui/Loading"
import { TaskBoardProvider, useTaskboard } from "../../../contexts/taskBorard"

import {
  progressTrackerHandleDragEnd,
  progressTrackerHandleDragStart,
  progressTrackerHandleDragUpdate,
} from "../../../helpers/progressTrackerHelpers"
import { Button } from "../../../styled/button"
import {
  SK_Heading,
  SK_Wrapper,
  SK_Thumbnail,
  Spinner,
} from "../../../styled/loader"
import DraggableElement from "./drag-element"
import TaskBoardModal from "./taskBoardModal"

const TaskBoard = () => {
  return (
    <TaskBoardProvider>
      <TaskboardComponent />
    </TaskBoardProvider>
  )
}

const TaskboardComponent = () => {
  const [placeholderProps, setPlaceholderProps] = useState({})

  const {
    showModal,
    data,
    isLoading,
    isError,
    setReqPosChange,
    deleteItem,
    setDeleteItem,
    isDeleting,
    handleDeleteTracker,
    isPosUpdating,
  } = useTaskboard()

  const lists = ["todo", "inprogress", "completed"]
  const queryAttr = "data-rbd-drag-handle-draggable-id"

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
          {isDeleting ? <Spinner size="1.2rem" type="white" /> : "Delete"}
        </Button>
      </Confirmation>
      <FlexWrapper>
        {!isError && <h3>Task Board</h3>}
        <Loading
          loading={isDeleting || isPosUpdating}
          startText={"Saving"}
          endText={"Saved!"}
        />
      </FlexWrapper>
      {isError ? (
        <h3 style={{ textAlign: "center" }}>Failed to Fetch Tasks</h3>
      ) : isLoading || !data ? (
        <Sekeleton>
          <SK_Wrapper>
            <div>
              <SK_Heading />
              <SK_Thumbnail />
            </div>
            <div>
              <SK_Heading />

              <SK_Thumbnail />
            </div>
            <div>
              <SK_Heading />

              <SK_Thumbnail />
            </div>
          </SK_Wrapper>
        </Sekeleton>
      ) : data ? (
        <Fragment>
          {showModal && <TaskBoardModal />}

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
      ) : null}
    </Fragment>
  )
}

export default TaskBoard

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 33%);
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
const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 0;
  h3 {
    margin-bottom: 0;
  }
`

const Sekeleton = styled.div`
  margin: 2rem;
  ${SK_Wrapper} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1.25rem;
    min-height: 350px;
    div {
      display: flex;
      flex-direction: column;
      ${SK_Heading} {
        height: 55px;
        margin-bottom: 1rem;
      }
      ${SK_Thumbnail} {
        width: 100%;
        height: 100%;
      }
    }
  }
`
