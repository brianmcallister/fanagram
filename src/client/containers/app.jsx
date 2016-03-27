import React from 'react';
import { Provider, connect } from 'react-redux';

import styles from 'stylesheets/style.scss'; // eslint-disable-line
import { userDataLoad } from 'actions';

const {
  bool,
  func,
  object,
  shape,
  string,
} = React.PropTypes;

const propTypes = {
  store: object.isRequired,
  user: shape({
    id: string,
    loading: bool.isRequired,
    loggedIn: bool.isRequired,
    username: string,
  }),
  userDataLoad: func,
};

const defaultProps = {

};

const mapStateToProps = (state) => (
  { ...state }
);

const mapDispatchToProps = (dispatch) => (
  {
    userDataLoad: () => dispatch(userDataLoad()),
  }
);

class App extends React.Component {
  componentWillMount() {
    this.props.userDataLoad();
  }

  renderMessage() {
    const { user } = this.props;

    if (user.loading) {
      return <p>loading...</p>;
    }

    if (user.loggedIn) {
      return <p>Welcome back {user.username}. | <a href="/logout">logout</a></p>;
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

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(App);
