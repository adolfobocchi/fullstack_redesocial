import api from "../../../services/api";

export const CREATE_COMMENT_REQUEST = 'CREATE_COMMENT_REQUEST';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_FAILURE = 'CREATE_COMMENT_FAILURE';

export const UPDATE_COMMENT_REQUEST = 'UPDATE_COMMENT_REQUEST';
export const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';
export const UPDATE_COMMENT_FAILURE = 'UPDATE_COMMENT_FAILURE';

export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';

export const GET_COMMENTS_REQUEST = 'GET_COMMENTS_REQUEST';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_FAILURE = 'GET_COMMENTS_FAILURE';

export const createCommentRequest = () => ({
  type: CREATE_COMMENT_REQUEST
});
export const createCommentSuccess = (comment) => ({
  type: CREATE_COMMENT_SUCCESS,
  payload: comment
});
export const createCommentFailure = (error) => ({
  type: CREATE_COMMENT_FAILURE,
  payload: error
});

export const updateCommentRequest = () => ({
  type: UPDATE_COMMENT_REQUEST
});
export const updateCommentSuccess = (comment) => ({
  type: UPDATE_COMMENT_SUCCESS,
  payload: comment
});
export const updateCommentFailure = (error) => ({
  type: UPDATE_COMMENT_FAILURE,
  payload: error
});

export const deleteCommentRequest = () => ({
  type: DELETE_COMMENT_REQUEST
});
export const deleteCommentSuccess = (id) => ({
  type: DELETE_COMMENT_SUCCESS,
  payload: id
});
export const deleteCommentFailure = (error) => ({
  type: DELETE_COMMENT_FAILURE,
  payload: error
});

export const getCommentsRequest = () => ({
  type: GET_COMMENTS_REQUEST
});
export const getCommentsSuccess = (postId) => ({
  type: GET_COMMENTS_SUCCESS,
  payload: postId
});
export const getCommentsFailure = (error) => ({
  type: GET_COMMENTS_FAILURE,
  payload: error
});

export const createComment = (comment) => {
  return async (dispatch) => {
    dispatch(createCommentRequest());
    try {
      const response = await api.post('/comment', comment);
      dispatch(createCommentSuccess(response.data));
    } catch (error) {
      dispatch(createCommentFailure(error.message));
    }
  };
};

export const updateComment = (comment) => {
  return async (dispatch) => {
    dispatch(updateCommentRequest());
    try {
      const response = await api.put('/comment', comment);
      dispatch(updateCommentSuccess(response.data));
    } catch (error) {
      dispatch(updateCommentFailure(error.message));
    }
  };
};

export const deleteComment = (id) => {
  return async (dispatch) => {
    dispatch(deleteCommentRequest());
    try {
      await api.delete(`/comment/${id}`);
      dispatch(deleteCommentSuccess(id));
    } catch (error) {
      dispatch(deleteCommentFailure(error.message));
    }
  };
};

export const getComments = (postId) => {
  return async (dispatch) => {
    dispatch(getCommentsRequest());
    try {
      const response = await api.get(`/comments/${postId}`);
      dispatch(getCommentsSuccess(response.data));
    } catch (error) {
      dispatch(getCommentsFailure(error.message));
    }
  };
};


