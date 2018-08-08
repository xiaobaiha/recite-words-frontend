import { combineReducers } from "redux";
import wordlist from "./wordlist";
import user from "./user";

export default combineReducers({
  wordlist,
  user
});
