import { useRef, useMemo, useEffect, RefObject, useState, DragEventHandler, EventHandler } from 'react';

interface DragCallBack{
  (ev: DragEvent): void
}

// interface DragOption{
//   onDragStart: (event: DragEvent) => void,
//   onDrag: (event: DragEvent) => void,
//   onDragEnd: (event: DragEvent) => void,
// }

export const useDrag = (): any => {
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const dragRef = useRef<HTMLElement>(null)
  useEffect(() => {
    console.log('useDrag-useDrag-useDrag');
  }, [isDragging])
  useEffect(() => {
    // const {onDragStart, onDrag, onDragEnd} = dragOpt
    const dragStartHandel = (event) => {
      setIsDragging(true)
    }
    const dragHandel: DragCallBack = (event) => {
    }
    const dragEndHandel: DragCallBack = (event) => {
      setIsDragging(false)
    }
    const node = dragRef.current
    if (node) {

      node.draggable = true
      node.addEventListener('dragstart', dragStartHandel)
      node.addEventListener('drag', dragHandel)
      node.addEventListener('dragend', dragEndHandel)

      return () => {
        node?.removeEventListener('dragstart', dragStartHandel)
        node?.removeEventListener('drag', dragHandel)
        node?.removeEventListener('dragend', dragEndHandel)
      }
    }
  }, [])
  return [dragRef, isDragging]
}

// const dropSlice = {
//   id: 1,
//   targets: [],
//   addTarget: (dataTransfer: any) => {
//     dataTransfer.setData('id', this.id)
//   }
// }

interface DropOption{
  onDragover?: (event: DragEvent) => void,
  onDropLeave?: (event: DragEvent) => void,
}

export const useDrop = (option?: DropOption) => {
  const [isDropOver, setIsDropOver] = useState<boolean>(false)
  const dropRef =  useRef<HTMLElement>(null)
  const { onDragover, onDropLeave } = option || {}

  let elemetNode: EventTarget | null = null
  const dropEnterHandel: DragCallBack = (event) => {
    elemetNode = event.target
    setIsDropOver(true)
  }

  const dropOverHandel: DragCallBack = (event: DragEvent) => {
    setIsDropOver(true)
    onDragover && onDragover(event)
  }
  const dropLeaveHandel: DragCallBack = (event: DragEvent) => {
    if (elemetNode === event.target) {
      setIsDropOver(false)
      onDropLeave && onDropLeave(event)
    }
  }

  const dropHandel: DragCallBack = (event: DragEvent) => {
    // todo
  }
  useEffect(() => {
    const node = dropRef.current
    if (node) {
      node.addEventListener('dragenter', dropEnterHandel, false)
      node.addEventListener('dragover', dropOverHandel, false)
      node.addEventListener('dragleave', dropLeaveHandel, false)
      node.addEventListener('drop', dropHandel, false)

      return () => {
        node.removeEventListener('dragenter', dropEnterHandel, false)
        node.removeEventListener('dragover', dropOverHandel, false)
        node.removeEventListener('dragleave', dropLeaveHandel, false)
        node.removeEventListener('drop', dropHandel, false)
      }
    }
  }, [])
  return [dropRef, isDropOver]
}