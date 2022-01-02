import * as actionType from "./actions";
const initialState = {
  isAuth: false,
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionType.SET_AUTH:
      return {
        ...state,
        isAuth: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
