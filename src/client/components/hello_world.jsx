import React from 'react';

const { func, number } = React.PropTypes;

const propTypes = {
  onButtonClick: func.isRequired,
  count: number.isRequired,
};

const defaultProps = {
  onButtonClick: () => {},
  count: 0,
};

const HelloWorld = ({ onButtonClick, count }) => (
  <div className="hello-world">
    <button onClick={onButtonClick}>click me</button>
    <p>count: {count}</p>
  </div>
);

HelloWorld.propTypes = propTypes;
HelloWorld.defaultProps = defaultProps;

export default HelloWorld;
