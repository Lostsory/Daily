import React, { createRef } from 'react';

interface DropAreaProp{
  onDragEnter?: (event: DragEvent) => void,
  onDragOver?: (event: DragEvent) => void,
  onDropLeave?: (event: DragEvent) => void,
}

interface DropAreaState{
}

class DropArea extends React.Component<DropAreaProp, DropAreaState>{
  dropRef = createRef()
  elemetNode: EventTarget | null = null

  componentDidMount() {
    const node = this.dropRef.current as HTMLElement
    node.addEventListener('dragenter', this.dropEnterHandel, false)
    node.addEventListener('dragover', this.dropOverHandel, false)
    node.addEventListener('dragleave', this.dropLeaveHandel, false)
  }
  componentWillUnmount() {
    const node = this.dropRef.current as HTMLElement
    node.removeEventListener('dragenter', this.dropEnterHandel, false)
    node.removeEventListener('dragover', this.dropOverHandel, false)
    node.removeEventListener('dragleave', this.dropLeaveHandel, false)
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
    return <div ref={this.dropRef}>
      {this.props.children}
    </div>
  }
}

export default DropArea