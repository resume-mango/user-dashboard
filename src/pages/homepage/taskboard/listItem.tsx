import { Draggable } from 'react-beautiful-dnd'
import React, { useState } from 'react'
import styled from 'styled-components'
import DropButton from '../../../components/ui/DropButton'
import ThreeDotsIcon from '../../../components/svgs/threeDots'
import { useTaskboard } from '../../../contexts/taskBorard'

const ListItem = ({ item, index }: { item: any; index: number }) => {
  const [show, setShow] = useState(false)

  const { setModalAction, setShowModal, setTracker, setDeleteItem } =
    useTaskboard()

  const handleEdit = (item: any) => {
    setTracker(item)
    setModalAction('edit')
    setShowModal(true)
  }
  return (
    <Draggable draggableId={item._id} index={index}>
      {(provided) => {
        return (
          <DragItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <ActionBtn
              vertical="bottom"
              horizontal="left"
              show={show}
              setShow={setShow}
            >
              <DropButton.Button>
                <ThreeDotsIcon size="0.875rem" />
              </DropButton.Button>
              <DropButton.Item>
                <a onClick={() => handleEdit(item)}>Edit</a>
              </DropButton.Item>
              <DropButton.Item>
                <a
                  onClick={() =>
                    setDeleteItem({ id: item._id, status: item.status })
                  }
                >
                  Delete
                </a>
              </DropButton.Item>
            </ActionBtn>
            <p className="truncate">
              <b>{item.title}</b>
            </p>
            <p className="truncate">{item.description}</p>
          </DragItem>
        )
      }}
    </Draggable>
  )
}

export default ListItem

const DragItem = styled.div`
  padding: 15px 10px 10px;
  margin-bottom: 10px;
  min-height: 75px;
  background: #fff;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  position: relative;
  p {
    width: 95%;
    margin: 0;
  }
`

const ActionBtn = styled(DropButton)`
  display: inline-flex;
  position: absolute;
  z-index: 1;
  cursor: pointer;
  top: 0;
  right: 0;
  padding: 5px 10px;
  button {
    padding: 0;
    svg {
      circle {
        transition: fill ease 0.3s;
      }
    }
    &:hover {
      svg {
        circle {
          fill: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }
  ul {
    margin: 0;
    padding: 5px 0;
    li {
      a {
        font-size: 0.8rem;
      }
    }
  }
`
