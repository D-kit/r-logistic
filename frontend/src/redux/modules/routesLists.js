import { actionTypes, dataPutRequest} from '../utils/requests';

// /////////////////////
// constants
// /////////////////////

const ROUTELIST_SAVE = 'ROUTELIST_SAVE';
const rl_save = actionTypes(ROUTELIST_SAVE);

// /////////////////////
// reducer
// /////////////////////

const initialState = {
  active: {
    number: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case rl_save.success:
      return {
        ...state,
        active: action.payload.data
      };
    default:
      return state;
  }
}

// /////////////////////
// action creators
// /////////////////////

export const saveRL = (data) => (dataPutRequest(ROUTELIST_SAVE, '/routelist/create', data));
