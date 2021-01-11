import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';



const ComponentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px;
`

const ComponentItem: any = styled.div`
  position: relative;
  border: 1px dashed #d9d9d9;
  line-height: 32px;
  height: 32px;
  margin-bottom: 12px;
  font-size: 14px;
  text-align: center;
  background: #fff;
  opacity: ${({isDragging, isClone}: any) => isClone ? isDragging ? 1 : 0 : 1};
  span{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const DragItem = styled.div`
  position: relative;
  background: red;
  height: 100%;
`

interface ComponentDisplayPanelProps{
  [x: string]: any
}

const ComponentDisplayPanel: React.FC<ComponentDisplayPanelProps> = ({data}) => {
  console.log(data)
  return <ComponentsWrap>
    {
      data.map(({type, name}: any, index: number) => {
        return <Droppable
          key={type}
          droppableId="board"
        >
          {(dropProvided: any) => <ComponentItem ref={dropProvided.innerRef}>
            <span>{name}</span>
            <Draggable  draggableId={type} index={index}>
              {(dragProvided: any) => {
                return <DragItem
                  ref={dragProvided.innerRef}
                  {...dragProvided.draggableProps}
                  {...dragProvided.dragHandleProps}
                />
              }}
            </Draggable>
            {dropProvided.placeholder}
          </ComponentItem>}
        </Droppable>
      })
    }
  </ComponentsWrap>
}

export default ComponentDisplayPanel