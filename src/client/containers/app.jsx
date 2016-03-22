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

  renderMessage() {
    const { user } = this.props;

    if (user.loading) {
      return <p>loading...</p>
    }

    if (user.loggedIn) {
      return <p>welcome back {user.username}. | <a href="/logout">logout</a></p>
    }

    return <a href="/auth/instagram">login</a>;
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          {this.renderMessage()}
          <p>{JSON.stringify(this.props)}</p>
        </div>
      </Provider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
