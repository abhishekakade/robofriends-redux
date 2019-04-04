import { CHANGE_SEARCH_FIELD } from "./constants";

const initialState = {
  // searchField is an empty string just as it is initially set in App.js using this.state
  searchField: ""
};

// Reducer
// export const searchRobots = (state = { initialState }, action = {}) => { ORIGINAL CODE THAT DIDNT WORK
export const searchRobots = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_SEARCH_FIELD:
      return Object.assign({}, state, { searchField: action.payload });
    default:
      return state;
  }
};
