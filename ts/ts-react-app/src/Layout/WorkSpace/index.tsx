import React, { useEffect, useRef } from 'react';
import styled, { StyledComponent } from 'styled-components'
import {Button} from 'antd'
import Layout from '../../components/base/Layout';
import { useDispatch, useSelector } from 'react-redux';
import {RootState} from '../../store';
import {addLayout} from '../../store/reducer/treeSlice';

import DragBox from '../../components/base/Drag'

import {useDrag, useDrop} from '../../hooks';

const WorkSpaceWrap = styled(Layout)`
  width: 100%;
  height: 100%;
  transition: all 200ms ease;
`

const DemoItem = styled.div`
  height: 32px;
  font-size: 14px;
  line-height: 32px;
  border: 1px dashed #ccc;
  transition: all 200ms ease;
  text-align: center;
`

interface dropProps {
  isDropOve: boolean
}
const DemoDrop: any = styled.div`
  width: 400px;
  height: 400px;
  background: ${({isDraging, isDropOver}: any) => isDraging ? isDropOver ? 'green' : 'yellow': '#fff'};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({isDraging}: any) => isDraging ? '#ccc' : 'transport'};
  /* pointer-events: none; */
  /* transition: background 200ms ease; */
`

const DemoDrop2: any = styled(DemoDrop)`
  width: 300px;
  height: 300px;
`

const DemoDrop3: any = styled(DemoDrop)`
  width: 200px;
  height: 200px;
`

const DemoDrop4: any = styled(DemoDrop)`
  width: 100px;
  height: 100px;
`



const WorkSpace: React.FC<any> = () => {
  // const layout = useSelector((state: RootState) => state.tree.layout)
  // const layoutIndex = useSelector((state: RootState) => state.tree.layoutIndex)
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(addLayout(<WorkSpaceWrap id={layoutIndex.toString()} />))
  // }, [dispatch])
  // if (layout.length) {
  //   return layout[0].component
  // } else {
  //   return null
  // }
  const [dragRef, isDraging] = useDrag()

  const [dropRef, isDropOver] = useDrop()
  const [dropRef2, isDropOver2] = useDrop()
  const [dropRef3, isDropOver3] = useDrop()
  const [dropRef4, isDropOver4] = useDrop()

  return <>
    {/* <DragBox render={<Button type='dashed' >测试按钮</Button>}>
      <DemoItem >测试按钮</DemoItem> 
    </DragBox> */}
    <Button ref={dragRef}>测试按钮</Button>
    <DemoDrop ref={dropRef} isDropOver={isDropOver} isDraging={isDraging}>
      <DemoDrop2 ref={dropRef2} isDropOver={isDropOver2} isDraging={isDraging}>
        <DemoDrop3 ref={dropRef3} isDropOver={isDropOver3} isDraging={isDraging}>
          <DemoDrop4 ref={dropRef4} isDropOver={isDropOver4} isDraging={isDraging}>
          
          </DemoDrop4>
        </DemoDrop3>
      </DemoDrop2>
    </DemoDrop>
  </>
}

export default WorkSpace
