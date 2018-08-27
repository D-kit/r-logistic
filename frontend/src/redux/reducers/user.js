
const initialState = {
  name: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MY_NAME_SUCCESS':
      return {
        ...state,
        name: action.payload.data
      };
    default:
      return {...state};
  }
}
