import { combineReducers } from 'redux';

const loggedIn = (state = null, action) => {
  return state;
}

const user = (state = {}, action) => {
  switch (action.type) {
    case 'USER_DATA_REQUEST':
      return { ...state, loading: true };
    case 'USER_DATA_RECEIVE':
      return {
        ...state,
        ...action.data,
        loading: false,
        loggedIn: true
      };
  }

  return state;
}

const rootReducer = combineReducers({
  user
});

export default rootReducer;
