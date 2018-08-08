const wordlistOperations = (state = {}, action) => {
  switch (action.type) {
    case "GET_LIST":
      return {
        ...state,
        wordlist: action.wordlist
      };
    case "ADD_WORD":
      return {
        ...state,
        wordlist: [...state.wordlist, action.word]
      };
    case "DEL_WORD":
      return {
        ...state,
        wordlist: state.wordlist.filter(item => item.word !== action.word)
      };
    default:
      return state;
  }
};

export default wordlistOperations;
