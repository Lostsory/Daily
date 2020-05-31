import React from 'react';

interface Greeeting{
  name: string
}

const Hello = (props: Greeeting) => <h1>{props.name}</h1>

export default Hello