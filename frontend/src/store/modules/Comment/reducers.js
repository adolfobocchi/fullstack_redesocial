import {
    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAILURE,
    UPDATE_COMMENT_REQUEST,
    UPDATE_COMMENT_SUCCESS,
    UPDATE_COMMENT_FAILURE,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE,
    RECENT_COMMENTS_REQUEST,
    RECENT_COMMENTS_SUCCESS,
    RECENT_COMMENTS_FAILURE,
    GET_COMMENTS_REQUEST,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_FAILURE,
    CLEAR_COMMENTS_REQUEST
  } from './actions';
  
  const initialState = {
    comments: [],
    comment: null,
    loading: false,
    error: null,
  };
  
  const commentReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_COMMENT_REQUEST:
        return { ...state, loading: true, error: null };
      case CREATE_COMMENT_SUCCESS:
        return { ...state, comments: [action.payload, ...state.comments ], loading: false, error: null };
      case CREATE_COMMENT_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case UPDATE_COMMENT_REQUEST:
        return { ...state, loading: true, error: null };
      case UPDATE_COMMENT_SUCCESS:
        return { ...state, comment: action.payload, loading: false, error: null };
      case UPDATE_COMMENT_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case DELETE_COMMENT_REQUEST:
        return { ...state, loading: true, error: null };
      case DELETE_COMMENT_SUCCESS:
        var index = state.comments.findIndex((comment) => comment.id === action.payload);
        return { ...state, comments: [...state.comments.slice(0, index), ...state.comments.slice(index + 1)], loading: false, error: null };
      case DELETE_COMMENT_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case GET_COMMENTS_REQUEST:
        return { ...state, loading: true, error: null };
      case CLEAR_COMMENTS_REQUEST:
        return { ...state, comments: [], loading: false, error: null };
      case GET_COMMENTS_SUCCESS:
        return { ...state, comments: action.payload, loading: false, error: null };
      case GET_COMMENTS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default commentReducer;