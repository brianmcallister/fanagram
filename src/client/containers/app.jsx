import React from 'react';
import { Provider, connect } from 'react-redux';

import styles from 'stylesheets/style.scss'
import { userDataLoad } from 'actions';
import HelloWorld from 'components/hello_world';

const mapStateToProps = (state) => {
  return { ...state }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onButtonClick: input => dispatch(incrementCount(input)),
    userDataLoad: () => dispatch(userDataLoad())
  }
}

class App extends React.Component {
  componentWillMount() {
    this.props.userDataLoad();
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <p>loading...</p>
          <p>{JSON.stringify(this.props)}</p>
        </div>
      </Provider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
