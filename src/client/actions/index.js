export function userDataRequest() {
  return {
    type: 'USER_DATA_REQUEST',
  };
}

export function userDataReceive(data) {
  return {
    type: 'USER_DATA_RECEIVE',
    data,
  };
}

export function userDataError(error) {
  return {
    type: 'USER_DATA_ERROR',
    error,
  };
}

export function userDataLoad() {
  return (dispatch) => {
    dispatch(userDataRequest());

    return fetch('/api/user', { credentials: 'include' })
      .then(resp => resp.json())
      .then(resp => dispatch(userDataReceive(resp)))
      .catch(err => dispatch(userDataError(err)));
  };
}
