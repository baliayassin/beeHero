const initialState = {
  selectedUser: null,
  users: [],
  posts: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_USER':
      return {...state, selectedUser: action.payload};
    case 'DELETE_USER':
      const userIdToDelete = action.payload;
      const updatedPosts = state.posts.filter(
        post => post.userId !== userIdToDelete,
      );
      const updatedUsers = state.users.filter(
        user => user.id !== userIdToDelete,
      );
     

      return {
        ...state,
        users: updatedUsers,
        posts: updatedPosts,
        selectedUser:
          state.selectedUser && state.selectedUser.id === userIdToDelete
            ? null
            : state.selectedUser,
      };
    case 'DELETE_POST':
      const updatedDeletePosts = state.posts.filter(
        post => post.id !== action.payload,
      );

      return {
        ...state,
        posts: updatedDeletePosts,
      };
    case 'SET_USERS':
      return {...state, users: action.payload};
    case 'SET_POSTS':
      return { ...state, posts: [...state.posts, ...action.payload] };
    case 'UPDATE_POST':
      const {userId, newTitle, newText} = action.payload;
      const editPosts = state.posts.map(post =>
        post.id === userId ? {...post, title: newTitle, body: newText} : post,
      );

      return {
        ...state,
        posts: editPosts,
      };
    default:
      return state;
  }
};

export default rootReducer;
