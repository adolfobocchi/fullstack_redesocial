import {
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAILURE,
    UPDATE_POST_REQUEST,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAILURE,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    RECENT_POSTS_REQUEST,
    RECENT_POSTS_SUCCESS,
    RECENT_POSTS_FAILURE,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    UNLIKE_POST_FAILURE,
    VIEW_POST_REQUEST,
    VIEW_POST_SUCCESS,
    VIEW_POST_FAILURE,
    GET_HISTORYS_REQUEST,
    GET_HISTORYS_SUCCESS,
    GET_HISTORYS_FAILURE,
    GENERATE_REPORT_REQUEST,
    GENERATE_REPORT_SUCCESS,
    GENERATE_REPORT_FAILURE,
    // ... Adicione outras constantes de ação conforme necessário
  } from './actions';
  
  const initialState = {
    posts: [],
    postsReport: [],
    historys: [],
    post: null,
    loading: false,
    error: null,
  };
  
  const postReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_POST_REQUEST:
        return { ...state, loading: true, error: null };
      case CREATE_POST_SUCCESS:
        return { ...state, posts: [action.payload, ...state.posts ], loading: false, error: null };
      case CREATE_POST_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case UPDATE_POST_REQUEST:
        return { ...state, loading: true, error: null };
      case UPDATE_POST_SUCCESS:
        var index = state.posts.findIndex((post) => post.id === action.payload.id);
        state.posts[index]= action.payload;
        return { ...state, posts: [...state.posts], loading: false, error: null };
      case UPDATE_POST_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case DELETE_POST_REQUEST:
        return { ...state, loading: true, error: null };
      case DELETE_POST_SUCCESS:
        var index = state.posts.findIndex((post) => post.id === action.payload);
        return { ...state, posts: [...state.posts.slice(0, index), ...state.posts.slice(index + 1)], loading: false, error: null };
      case DELETE_POST_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case RECENT_POSTS_REQUEST:
        return { ...state, loading: true, error: null };
      case RECENT_POSTS_SUCCESS:
        return { ...state, posts: action.payload, loading: false, error: null };
      case RECENT_POSTS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case LIKE_POST_REQUEST:
        return { ...state, loading: true, error: null };
      case LIKE_POST_SUCCESS:
        var index = state.posts.findIndex((post) => post.id === action.payload);
        var post = state.posts[index];
        var likes = parseInt(post.likes) + 1;
        post.likes = likes;
        state.posts[index]= post;
        return { ...state, posts: [...state.posts], loading: false, error: null };
      case LIKE_POST_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case UNLIKE_POST_REQUEST:
        return { ...state, loading: true, error: null };
      case UNLIKE_POST_SUCCESS:
        var index = state.posts.findIndex((post) => post.id === action.payload);
        var post = state.posts[index];
        var unlikes = parseInt(post.unlikes) + 1;
        post.unlikes = unlikes;
        state.posts[index]= post;
        return { ...state, posts: [...state.posts], loading: false, error: null };
      case UNLIKE_POST_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case VIEW_POST_REQUEST:
        return { ...state, loading: true, error: null };
      case VIEW_POST_SUCCESS:
        var index = state.posts.findIndex((post) => post.id === action.payload);
        var post = state.posts[index];
        var views = parseInt(post.views) + 1;
        post.views = views;
        state.posts[index]= post;
        return { ...state, posts: [...state.posts], loading: false, error: null };
      case VIEW_POST_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case GET_HISTORYS_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_HISTORYS_SUCCESS:
        return { ...state, historys: action.payload, loading: false, error: null };
      case GET_HISTORYS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case GENERATE_REPORT_REQUEST:
        return { ...state, loading: true, error: null };
      case GENERATE_REPORT_SUCCESS:
        return { ...state, postsReport: action.payload, loading: false, error: null };
      case GENERATE_REPORT_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default postReducer;