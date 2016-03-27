const user = (state = {}, action) => {
  // If there's no `id`, they're not logged in.
  const loggedIn = !!action.data && !!action.data.id;

  switch (action.type) {
    case 'USER_DATA_REQUEST':
      return { ...state, loading: true };
    case 'USER_DATA_RECEIVE':
      return {
        ...state,
        ...action.data,
        loggedIn,
        loading: false,
      };
    default:
      return state;
  }
};

export { user };
