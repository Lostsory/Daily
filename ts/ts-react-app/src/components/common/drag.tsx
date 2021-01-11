import React, { createRef, RefObject } from 'react';
import { useDrop } from '../../hooks/index';
import { Button } from 'antd';
import styled, { StyledComponent } from 'styled-components'

const DemoDrop = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* pointer-events: none; */
  /* transition: background 200ms ease; */
`

interface dragProp{
  onDragEnter?: (event: DragEvent) => void,
  onDragOver?: (event: DragEvent) => void,
  onDropLeave?: (event: DragEvent) => void,
}

interface dragState{
}

class drag extends React.Component<dragProp, dragState>{
  dragRef = createRef()
  elemetNode: EventTarget | null = null
  componentDidMount() {
    const node = this.dragRef.current as HTMLElement
    node.addEventListener('dragenter', this.dropEnterHandel, false)
  }
  dropEnterHandel = (event: DragEvent) => {
    this.elemetNode = event.target
    this.props.onDragEnter && this.props.onDragEnter(event)
  }
  dropOverHandel = (event: DragEvent) => {
    this.props.onDragOver && this.props.onDragOver(event)
  }
  dropLeaveHandel = (event: DragEvent) => {
    if (this.elemetNode === event.target) {
      this.props.onDropLeave && this.props.onDropLeave(event)
    }
  }
  render() {
    // @ts-ignore
    return <div ref={this.dragRef}>
      {this.props.children}
    </div>
  }
}

export default drag