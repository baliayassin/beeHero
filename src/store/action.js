export const selectUser = user => ({
  type: 'SELECT_USER',
  payload: user,
});

export const setUsers = users => ({
  type: 'SET_USERS',
  payload: users,
});

export const deletePost = postId => ({
  type: 'DELETE_POST',
  payload: postId,
});

export const deleteUser = userId => ({
  type: 'DELETE_USER',
  payload: userId,
});
export const setPosts = posts => ({
  type: 'SET_POSTS',
  payload: posts,
});

export const updatePost = post => ({
  type: 'UPDATE_POST',
  payload: post,
});
