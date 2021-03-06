import { createAction } from 'redux-actions'
import { config } from '../config.js'
import ga from 'react-ga'

// const POST_COMMENT = 'POST_COMMENT';
// const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const LOAD_COMMENTS = 'LOAD_COMMENTS'

export const loadCommentsPatch = createAction(LOAD_COMMENTS)
export const loadComments = (postId) => {
  return (dispatch, getState) => {
    if (!postId) {
      return false
    }
    fetch(`${config.http}/api/comments/${postId}`, {credentials: 'include'})
      .then((r) => r.json())
      .then((comments) => {
        dispatch(loadCommentsPatch({postId: postId, comments: comments}))
        console.log(comments)
      })
  }
}
export const postComment = (text, postId) => {
  return (dispatch, getState) => {
    if (!text) {
      console.log('no text')
      return false
    }
    console.log(postId)
    // var authenticated = getState().auth.authenticated
    // if (!authenticated) {
    //   return console.log('Only authenticated users can write comments')
    // }
    var alias = getState().auth.user.alias
    var body = `text=${text}&created_by=${alias}&post_id=${postId}`
    fetch(`${config.http}/api/comments`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': config.post
      },
      body: body
    })
    .then((r) => r.json())
    .then((data) => {
      dispatch(loadComments(postId))
      console.log(data)
      ga.event({
        category: 'Comments',
        action: 'Comment created'
      })
    })
  }
}

// const removeCommentPatch = createAction(REMOVE_COMMENT);
export const removeComment = id => {
  return (dispatch, getState) => {
    console.log(id)
    fetch(`${config.http}/api/comments/${id}`,
      {method: 'DELETE', credentials: 'include'})
      .then((r) => r.json())
      .then((res) => {
        console.log(res)
      })
      .catch((e) => console.log(e))
    // dispatch(removeCommentPatch(id));
    ga.event({
      category: 'Comments',
      action: 'Removed Comment'
    })
  }
}
