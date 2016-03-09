import { createAction, handleActions } from 'redux-actions';
import {config} from '../config.js';
import { updatePostsCounter } from './user';
import { fetchPosts, fetchLoadMorePosts } from './isFetching';
import ga from 'react-ga';

export const LOAD_POSTS = 'LOAD_POSTS';
export const SEND_POST = 'SEND_POST';
export const LOAD_MORE_POSTS = 'LOAD_MORE_POSTS';
export const REMOVE_POST = 'REMOVE_POST';
export const LIKE_POST = 'LIKE_POST';

export const likePost = createAction(LIKE_POST, async (id) => {
  if (!id) {
    return false;
  }
  console.log(id);
  fetch(`${config.http}/api/likes`, {
    method: 'POST',
    headers: {
      'Content-type': config.post
    },
    body: `object=${id}`
  })
  .then((r) => r.json())
  .then((res) => {
    console.log(res);
  })
})

const loadPostsPatch = createAction(LOAD_POSTS);
export const loadPosts = (offset) => {
  return (dispatch, getState) => {
    var alias = window.location.pathname.substr(1);
    // var alias = 'abracadabra';
    var url = `${config.http}/api/posts/${alias}`
    if (offset) {
      url += `/${offset}`
    }
    dispatch(fetchPosts(true));
    console.log(url);
    fetch(url)
      .then((r) => r.json())
      .then((posts) => {
        dispatch(loadPostsPatch(posts));
        dispatch(fetchPosts(false));
      })
  }
};

export const loadMorePostsPatch = createAction(LOAD_MORE_POSTS);
export const loadMorePosts = (offset) => {
  return (dispatch, getState) => {
    dispatch(fetchLoadMorePosts(true));
    var alias = window.location.pathname.substr(1);
    // var alias = 'abracadabra';
    var url = `${config.http}/api/posts/${alias}`
    if (offset) {
      url += `/${offset}`
    }
    console.log(url);
    fetch(url)
      .then((r) => r.json())
      .then((posts) => {
        if (!posts) {

        }
        dispatch(fetchLoadMorePosts(false));
        dispatch(loadMorePostsPatch(posts));
        ga.event({
          category: 'Posts',
          action: 'More Posts Loaded'
        });
      })
  }
}

const removePostPatch = createAction(REMOVE_POST);
export const removePost = id => {
  return (dispatch, getState) => {
    console.log(id);
    fetch(`${config.http}/api/posts/remove/${id}`, {credentials: 'same-origin'})
      .then((r) => r.json())
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
    dispatch(removePostPatch(id));
    ga.event({
      category: 'Posts',
      action: 'Removed Post'
    });
  }
}

export const send = createAction(SEND_POST);

export const sendPost = (text, photo) => {
  return (dispatch, getState) => {
    var alias = getState().user.alias;
    var body = `text=${text}&created_by=${alias}`;
    if (photo) {
      body += `&photo=${photo}`;
    }
    if (!photo && !text) {
      return;
    }
    fetch(`${config.http}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-type': config.post
      },
      body: body
    })
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
      if (data.status === 1) {
        dispatch(loadPosts());
        dispatch(updatePostsCounter());
      } else {

      }
      dispatch(send());
      ga.event({
        category: 'Posts',
        action: 'Created Post'
      });
    });
  }
}

export const actions = {
  loadPosts,
  sendPost,
  loadMorePosts,
  removePost,
  likePost
}

export default handleActions({
  [LOAD_POSTS]: (state, { payload }) => {
    return [...payload];
  },
  [LOAD_MORE_POSTS]: (state, { payload }) => {
    return [...state, ...payload];
  },
  [REMOVE_POST]: (state, { payload }) => {
    // Find a post with that ID and slice it.
    for (var i = 0; i < state.length; i++) {
      var postID = state[i]._id;
      if (postID === payload) {
        break;
      }
    }
    return [
      ...state.slice(0, i),
      ...state.slice(i + 1)
    ];
  }
}, []);
