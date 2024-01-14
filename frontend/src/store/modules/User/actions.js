import api from "../../../services/api";

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAILURE = 'UPDATE_PASSWORD_FAILURE';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';


export const registerUserRequest = () => ({
  type: REGISTER_USER_REQUEST
});
export const registerUserSuccess = (user) => ({
  type: REGISTER_USER_SUCCESS,
  payload: user
});
export const registerUserFailure = (error) => ({
  type: REGISTER_USER_FAILURE,
  payload: error
});

export const loginUserRequest = () => ({
  type: LOGIN_USER_REQUEST
});
export const loginUserSuccess = (login) => ({
  type: LOGIN_USER_SUCCESS,
  payload: login
});
export const loginUserFailure = (error) => ({
  type: LOGIN_USER_FAILURE,
  payload: error
});

export const logoutUserRequest = () => ({
  type: LOGOUT_USER_REQUEST
});

export const updateUserRequest = () => ({
  type: UPDATE_USER_REQUEST
});
export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user
});
export const updateUserFailure = (error) => ({
  type: UPDATE_USER_FAILURE,
  payload: error
});

export const deleteUserRequest = () => ({
  type: DELETE_USER_REQUEST
});
export const deleteUserSuccess = () => ({
  type: DELETE_USER_SUCCESS,
});
export const deleteUserFailure = (error) => ({
  type: DELETE_USER_FAILURE,
  payload: error
});

export const registerUser = (user) => {
  return async (dispatch) => {
    dispatch(registerUserRequest());
    try {
      const response = await api.post('/register', user);
      dispatch(registerUserSuccess(response.data));
    } catch (error) {
      dispatch(registerUserFailure(error.message));
    }
  };
};

export const loginUser = (credenciais) => {
  return async (dispatch) => {
    dispatch(loginUserRequest());
    try {
      const response = await api.post('/login', credenciais);
      dispatch(loginUserSuccess(response.data));
    } catch (error) {
      dispatch(loginUserFailure(error.message));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      dispatch(logoutUserRequest());
    } catch (error) {

    }

  };
}

export const updateUser = (user) => {
  return async (dispatch) => {
    dispatch(updateUserRequest());
    try {
      const response = await api.put('/user', user);
      dispatch(updateUserSuccess(response.data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
};

export const deleteUser = (user) => {
  return async (dispatch) => {
    dispatch(deleteUserRequest());
    try {
      const response = await api.delete(`/user/${user.userId}`);
      dispatch(deleteUserSuccess(response.data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
};