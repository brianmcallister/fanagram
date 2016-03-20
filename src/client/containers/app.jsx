import React from 'react';
import { Provider, connect } from 'react-redux';

import { incrementCount } from 'actions';
import HelloWorld from 'components/hello_world';
import styles from 'stylesheets/style.scss'

const mapStateToProps = (state) => {
  return {
    count: state.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onButtonClick: (input) => {
      console.log('dispatch', dispatch);
      dispatch(incrementCount(input))
    }
  }
}

class App extends React.Component {
  request() {
    fetch('/api/test', { credentials: 'include' })
      .then(resp => console.log(resp))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <button onClick={this.request.bind(this)}>click</button>
          <HelloWorld { ...this.props } />
        </div>
      </Provider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
