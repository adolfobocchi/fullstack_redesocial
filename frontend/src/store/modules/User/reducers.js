import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_REQUEST,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  // ... Adicione outras constantes de ação conforme necessário
} from './actions';

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case REGISTER_USER_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: null };
    case REGISTER_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LOGIN_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload.user, token: action.payload.token, isAuthenticated: true, loading: false, error: null };
    case LOGIN_USER_FAILURE:
      return { ...state, loading: false, isAuthenticated: false, token: null, user: null, error: action.payload };
    case LOGOUT_USER_REQUEST:
      return initialState;
    case UPDATE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_USER_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: null };
    case UPDATE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_USER_SUCCESS:
      return initialState;
    case DELETE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;