import React from 'react'
import ReactDom from 'react-dom';
import Hello from './component/demo/hello';


ReactDom.render(
  <Hello name="Typescript" />,
  document.querySelector('#app')
)
