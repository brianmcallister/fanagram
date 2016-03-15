import React from 'react';
import { Provider, connect } from 'react-redux';

import { incrementCount } from 'actions';
import HelloWorld from 'components/presentational/hello_world';
import styles from 'stylesheets/style.scss'

const mapStateToProps = (state) => {
  return {
    count: state.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onButtonClick: (input) => {
      dispatch(incrementCount(input))
    }
  }
}

class App extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <HelloWorld { ...this.props } />
      </Provider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
