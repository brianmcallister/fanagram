import React from 'react';

const HelloWorld = ({ onButtonClick, count }) => {
  return (
    <div>
      <button onClick={onButtonClick}>click me</button>
      <p>count: {count}</p>
    </div>
  )
}

export default HelloWorld;
