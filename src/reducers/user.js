const userOperations = (state = {}, action) => {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
};

export default userOperations;
