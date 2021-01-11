import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'
import {RootState} from '../store';
import { addLayout, addChildByLayoutId } from '../store/reducer/treeSlice';
import {FuckComponent} from '../interface';

import ComponentDisplayPanel from './ComponentDisplayPanel';
import WorkSpace from './WorkSpace';

import components from '../components';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  height: 64px;
  background: #f0f1f1;
  line-height: 64px;
`

const Layout = styled.div`
  flex-grow: 1;
  display: flex;
`

const Sider = styled.div`
  background: #f0f1f1;
  width: 200px;
`

const Content = styled.div`
  background: #fafafa;
  flex-grow: 1;
`

interface AppLayoutProps {
  [x: string]: any
}

const getSourceDataMap = (data: any) => {
  const map = {}
  data.forEach((item: any) => {
    map[item.info.type] = item
  });
  return map
}

const sourceData = Object.values(components)

const sourceDataMap = getSourceDataMap(sourceData)

const reorder = (list: FuckComponent<any>[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  console.log(result);

  return result;
};
const AppLayout: React.FC<AppLayoutProps> = () => {
  const dispatch = useDispatch()
  const layoutIndex = useSelector((state: RootState) => state.tree.layoutIndex)
  const [componentsData] = useState<any>(sourceData.map((v) => ({
    type: v.info.type,
    name: v.info.name,
  })))

  const dragEnd = (result: any) => {
    console.log(result);
    const NewItem = sourceDataMap[result.draggableId]
    if (result.combine) {
      console.log('esult.combineesult.combineesult.combine');
      if (result.source.droppableId === 'board') {
        if (result.draggableId === 'layout') {
          const id = layoutIndex.toString()
          dispatch(addLayout(<NewItem id={id} />))
          dispatch(addChildByLayoutId({
            id: result.destination.droppableId,
            child: <NewItem  id={id}/>
          }))
        } else {
          console.log('sadadasdas');
          dispatch(addChildByLayoutId({
            id: result.combine.droppableId,
            child: <NewItem />
          }))
        }
      }
    } else {
      if (!result.destination) {
        return;
      }
      if (result.destination.droppableId !== "board" && result.source.droppableId === 'board') {
        if (result.draggableId === 'layout') {
          const id = layoutIndex.toString()
          dispatch(addLayout(<NewItem id={id} />))
          dispatch(addChildByLayoutId({
            id: result.destination.droppableId,
            child: <NewItem  id={id}/>
          }))
        } else {
          dispatch(addChildByLayoutId({
            id: result.destination.droppableId,
            child: <NewItem />
          }))
        }
      }
    }
  }

  const dragStart = () => {

  }

  const beforeCapture = (before) => {
    console.log('before', before, componentsData)
  }

  
  
  const dragUpdate = useCallback((update) => {
    console.log('Update', update)
  }, [])
  return <Wrapper style={{height: '100%'}}>
    <Header>
      <h1>Fuck the admin</h1>
    </Header>
    <DragDropContext
      onBeforeCapture={beforeCapture}
      onDragEnd={dragEnd}
      onDragStart={dragStart}
      onDragUpdate={dragUpdate}>
      <Layout>
        <Sider>
          {/* <ComponentDisplayPanel data={componentsData}></ComponentDisplayPanel> */}
        </Sider>
        <Content>
          <WorkSpace></WorkSpace>
        </Content>
      </Layout>
    </DragDropContext>
  </Wrapper>
}

export default AppLayout