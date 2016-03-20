import { combineReducers } from 'redux';

const count = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT_COUNT':
      return state + 1;
  }

  return state;
}

const loggedIn = (state = null, action) => {
  return state;
}

const rootReducer = combineReducers({
  loggedIn,
  count
});

export default rootReducer;
