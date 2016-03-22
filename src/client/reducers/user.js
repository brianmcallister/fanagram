const user = (state = {}, action) => {
  switch (action.type) {
    case 'USER_DATA_REQUEST':
      return { ...state, loading: true };
    case 'USER_DATA_RECEIVE':
      // If there's no `id`, they're not logged in.
      let loggedIn = !!action.data.id;

      return {
        ...state,
        ...action.data,
        loggedIn,
        loading: false,
      };
  }

  return state;
}

export { user };
