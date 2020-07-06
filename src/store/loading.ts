import { Action } from 'redux';

const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';

type StartLoading = Action<typeof START_LOADING>;
type FinishLoading = Action<typeof FINISH_LOADING>;

export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = () => ({ type: FINISH_LOADING });

const initialState = {
  isLoading: false,
  isLoaded: false,
};

const loadingReducer = (
  state = initialState,
  action: StartLoading | FinishLoading 
) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case FINISH_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default loadingReducer;
