import api from "../../../services/api";

export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const RECENT_POSTS_REQUEST = 'RECENT_POSTS_REQUEST';
export const RECENT_POSTS_SUCCESS = 'RECENT_POSTS_SUCCESS';
export const RECENT_POSTS_FAILURE = 'RECENT_POSTS_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const VIEW_POST_REQUEST = 'VIEW_POST_REQUEST';
export const VIEW_POST_SUCCESS = 'VIEW_POST_SUCCESS';
export const VIEW_POST_FAILURE = 'VIEW_POST_FAILURE';

export const GET_HISTORYS_REQUEST = 'GET_HISTORYS_REQUEST';
export const GET_HISTORYS_SUCCESS = 'GET_HISTORYS_SUCCESS';
export const GET_HISTORYS_FAILURE = 'GET_HISTORYS_FAILURE';

export const GENERATE_REPORT_REQUEST = 'GENERATE_REPORT_REQUEST';
export const GENERATE_REPORT_SUCCESS = 'GENERATE_REPORT_SUCCESS';
export const GENERATE_REPORT_FAILURE = 'GENERATE_REPORT_FAILURE';

export const createPostRequest = () => ({
  type: CREATE_POST_REQUEST
});
export const createPostSuccess = (post) => ({
  type: CREATE_POST_SUCCESS,
  payload: post
});
export const createPostFailure = (error) => ({
  type: CREATE_POST_FAILURE,
  payload: error
});

export const updatePostRequest = () => ({
  type: UPDATE_POST_REQUEST
});
export const updatePostSuccess = (post) => ({
  type: UPDATE_POST_SUCCESS,
  payload: post
});
export const updatePostFailure = (error) => ({
  type: UPDATE_POST_FAILURE,
  payload: error
});

export const deletePostRequest = () => ({
  type: DELETE_POST_REQUEST
});
export const deletePostSuccess = (id) => ({
  type: DELETE_POST_SUCCESS,
  payload: id
});
export const deletePostFailure = (error) => ({
  type: DELETE_POST_FAILURE,
  payload: error
});

export const recentPostsRequest = () => ({
  type: RECENT_POSTS_REQUEST
});
export const recentPostsSuccess = (posts) => ({
  type: RECENT_POSTS_SUCCESS,
  payload: posts
});
export const recentPostsFailure = (error) => ({
  type: RECENT_POSTS_FAILURE,
  payload: error
});

export const likePostRequest = () => ({
  type: LIKE_POST_REQUEST
});
export const likePostSuccess = (id) => ({
  type: LIKE_POST_SUCCESS,
  payload: id
});
export const likePostFailure = (error) => ({
  type: LIKE_POST_FAILURE,
  payload: error
});

export const unlikePostRequest = () => ({
  type: UNLIKE_POST_REQUEST
});
export const unlikePostSuccess = (id) => ({
  type: UNLIKE_POST_SUCCESS,
  payload: id
});
export const unlikePostFailure = (error) => ({
  type: UNLIKE_POST_FAILURE,
  payload: error
});


export const viewPostRequest = () => ({
  type: VIEW_POST_REQUEST
});
export const viewPostSuccess = (id) => ({
  type: VIEW_POST_SUCCESS,
  payload: id
});
export const viewPostFailure = (error) => ({
  type: VIEW_POST_FAILURE,
  payload: error
});

export const getHistorysRequest = () => ({
  type: GET_HISTORYS_REQUEST
});
export const getHistorysSuccess = (postId) => ({
  type: GET_HISTORYS_SUCCESS,
  payload: postId
});
export const getHistorysFailure = (error) => ({
  type: GET_HISTORYS_FAILURE,
  payload: error
});


export const generateReportRequest = () => ({
  type: GENERATE_REPORT_REQUEST
});
export const generateReportSuccess = (postId) => ({
  type: GENERATE_REPORT_SUCCESS,
  payload: postId
});
export const generateReportFailure = (error) => ({
  type: GENERATE_REPORT_FAILURE,
  payload: error
});

export const createPost = (post) => {
  return async (dispatch) => {
    dispatch(createPostRequest());
    try {
      const response = await api.post('/post', post);
      dispatch(createPostSuccess(response.data));
    } catch (error) {
      dispatch(createPostFailure(error.message));
    }
  };
};

export const updatePost = (post) => {
  return async (dispatch) => {
    dispatch(updatePostRequest());
    
    try {
      const response = await api.put('/post', post);
      dispatch(updatePostSuccess(response.data));
    } catch (error) {
      dispatch(updatePostFailure(error.message));
    }
  };
};

export const deletePost = (post) => {
  return async (dispatch) => {
    dispatch(deletePostRequest());
    try {
      await api.delete(`/post/${post.id}`, post);
      dispatch(deletePostSuccess(post.id));
    } catch (error) {
      dispatch(deletePostFailure(error.message));
    }
  };
};

export const recentPosts = (post) => {
  return async (dispatch) => {
    dispatch(recentPostsRequest());
    try {
      const response = await api.get(`/posts`);
      dispatch(recentPostsSuccess(response.data));
    } catch (error) {
      dispatch(recentPostsFailure(error.message));
    }
  };
};


export const likePost = (id) => {
  return async (dispatch) => {
    dispatch(likePostRequest());
    try {
      await api.put(`/post/like/${id}`);
      dispatch(likePostSuccess(id));
    } catch (error) {
      dispatch(likePostFailure(error.message));
    }
  };
};


export const unlikePost = (id) => {
  return async (dispatch) => {
    dispatch(unlikePostRequest());
    try {
      await api.put(`/post/unlike/${id}`);
      dispatch(unlikePostSuccess(id));
    } catch (error) {
      dispatch(unlikePostFailure(error.message));
    }
  };
};


export const viewPost = (id) => {
  return async (dispatch) => {
    dispatch(viewPostRequest());
    try {
      await api.put(`/post/view/${id}`);
      dispatch(viewPostSuccess(id));
    } catch (error) {
      dispatch(viewPostFailure(error.message));
    }
  };
};

export const getHistorys = (postId) => {
  return async (dispatch) => {
    dispatch(getHistorysRequest());
    try {
      const response = await api.get(`/historys/${postId}`);
      dispatch(getHistorysSuccess(response.data));
    } catch (error) {
      dispatch(getHistorysFailure(error.message));
    }
  };
};

export const generateReport = (postId) => {
  return async (dispatch) => {
    dispatch(generateReportRequest());
    try {
      const response = await api.get(`/posts/report`);
      dispatch(generateReportSuccess(response.data));
    } catch (error) {
      dispatch(generateReportFailure(error.message));
    }
  };
};

