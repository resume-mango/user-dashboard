import { Droppable } from 'react-beautiful-dnd'
import React, { Fragment } from 'react'
import styled from 'styled-components'
import ListItem from './listItem'
import { useProgressTracker } from '../../contexts/progressTracker'

interface IProps {
  name: string
  elements: Array<any>
  placeholderProps: any
}

const DraggableElement: React.FC<IProps> = ({
  name,
  elements,
  placeholderProps,
}) => {
  const { setTracker, setModalAction, setShowModal } = useProgressTracker()
  const handleCreate = (status: string) => {
    setTracker({ status, color: 'blue' })
    setModalAction('create')
    setShowModal(true)
  }
  return (
    <Wrapper>
      <ColumnHeader>
        <p>{name}</p>
      </ColumnHeader>
      <DroppableStyles>
        <Droppable droppableId={`${name}`}>
          {(provided, snapshot) => (
            <Fragment>
              <DropableContainer
                id={`drag-column-${name}`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {elements &&
                  elements.map((item: any, i: number) => (
                    <ListItem
                      key={item._id}
                      item={{ ...item, status: name }}
                      index={i}
                    />
                  ))}

                {provided.placeholder}
                {placeholderProps &&
                  Object.keys(placeholderProps).length > 0 &&
                  snapshot.isDraggingOver && (
                    <Placeholder
                      style={{
                        top: placeholderProps.clientY,
                        left: placeholderProps.clientX,
                        height: placeholderProps.clientHeight,
                        width: placeholderProps.clientWidth,
                      }}
                    />
                  )}
                <ColumnFooter>
                  <p
                    className="add-task-btn"
                    onClick={() => handleCreate(name)}
                  >
                    New Task
                  </p>
                </ColumnFooter>
              </DropableContainer>
            </Fragment>
          )}
        </Droppable>
      </DroppableStyles>
    </Wrapper>
  )
}

export default DraggableElement

const ColumnHeader = styled.div`
  margin-bottom: 10px;
  text-transform: capitalize;
  background: rgba(241, 241, 241, 0.6);
  padding: 10px;
  border-radius: 4px;
  p {
    font-weight: bold;
    margin: 0;
  }
`
const ColumnFooter = styled.div`
  position: relative;
  p {
    text-transform: capitalize;
    background: rgba(224, 224, 224, 0.6);
    padding: 7px;
    border-radius: 4px;
    cursor: pointer;
    margin: 0;
    text-align: center;
    width: 100%;
    height: fit-content;
  }
`

const DroppableStyles = styled.div`
  padding: 10px;
  background: rgba(241, 241, 241, 0.6);
  border-radius: 4px;
  height: 100%;
  display: flex;
  flex-direction: column;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  @media (max-width: 900px) {
    width: 275px;
  }
`
const DropableContainer = styled.div`
  height: 100%;
  position: relative;
  min-height: 300px;
`
const Placeholder = styled.div`
  position: absolute;
  border-radius: 3px;
  background-color: rgba(224, 224, 224, 0.6);
`
