import React, {useRef, useCallback, useState} from 'react'
import ReactDOM from 'react-dom';

// type ChildrenFn = (...any) => React.ReactElement | null;

interface DragProps {
  [x: string]: any,
  children: React.ReactElement | null
}

// function demoHook(props) {
//   const isOnline = useFriendStatus(props.friend.id);

//   if (isOnline === null) {
//     return 'Loading...';
//   }
//   return isOnline ? 'Online' : 'Offline';
// }

const Drag: React.FC<DragProps> = ({ render, children }) => {
  // const newCom = React.createElement(Button, {type: 'dashed'}, '测试按钮')
  // const ref = useRef(null)
  const [boundingClientRect, setBoundingClientRect] = useState(null)
  const setRef = useCallback(node => {
    if (node !== null) {
      setBoundingClientRect(node.getBoundingClientRect());
    }
  }, []);
  // const dragContainer = document.createElement('div')
  // const mouseDown = () => {
  //   dragContainer.className = 'fuck-drag-item'
  //   document.body.appendChild(dragContainer);
  //   const DragPre = () => {
  //     return <>{render}</>
  //   }
  //   ReactDOM.render(<DragPre />, dragContainer);
  // }
  // const mouseMove = (ev) => {
  //   console.log(ev);
    
  // }
  // return <div
  //   ref={setRef}
  //   onMouseDown={mouseDown}
  //   onMouseMove={(ev: React.MouseEvent) => mouseMove(ev)}
  // >
  //   {children}
  // </div>

  const dragStart = (ev) => {
    ev.persist()
    console.log(ev)
  }
  const dragging = (ev) => {
    ev.persist()
    console.log(ev)
  }
  const dragEnd = (ev) => {
    ev.persist()
    console.log(ev);
  }
  return <div
    draggable
    style={{display: 'inline-block'}}
    onDragEnd={(ev: React.DragEvent) => dragEnd(ev)}
    onDrag={(ev: React.DragEvent) => dragging(ev)}
    onDragStart={(ev: React.DragEvent) => dragStart(ev)}
  >
    {children}
  </div>
}

export default Drag
