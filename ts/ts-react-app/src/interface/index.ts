import React from 'react';
export interface ComponentItem {
  type: string;
  name: string;
  display: string;
  component: React.FC<any>
}

// export interface FuckComponent<T> extends React.Component {
//   info?: {
//     name: string,
//     type: string,
//     [x: string]: any
//   }
//   [x: string]: any
// }

export interface FuckComponent<T>{
  info: {
    name: string,
    type: string,
    [x: string]: any
  }
  [x: string]: any
}