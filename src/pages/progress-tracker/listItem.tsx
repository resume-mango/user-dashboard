import { Draggable } from 'react-beautiful-dnd'
import React, { useState } from 'react'
import styled from 'styled-components'
import ThreeDotsIcon from '../../components/svgs/threeDots'
import DropButton from '../../components/ui/DropButton'
import { useProgressTracker } from '../../contexts/progressTracker'

const colors: any = {
  red: 'rgba(255, 216, 212, 1)',
  green: 'rgba(210, 246, 222, 1)',
  yellow: 'rgba(249, 240, 141, 1)',
  blue: 'rgba(209, 230, 255, 1)',
}

const ListItem = ({ item, index }: { item: any; index: number }) => {
  const [show, setShow] = useState(false)

  const { setModalAction, setShowModal, setTracker, setDeleteItem } =
    useProgressTracker()

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
            color={colors[item.color]}
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
              <b>{item.company}</b>
            </p>
            <p className="truncate">{item.job_title}</p>
          </DragItem>
        )
      }}
    </Draggable>
  )
}

export default ListItem

const DragItem = styled.div<{ color: string }>`
  padding: 15px 10px 10px;
  margin-bottom: 10px;
  min-height: 75px;
  background: ${({ color }) => color};
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
