import { Action } from 'redux';

export const FETCH_NEO_DATA = 'FETCH_NEO_DATA';
export const ADD_NEO_DATA = 'ADD_NEO_DATA';
export const RELOAD_NEO_DATA = 'RELOAD_NEO_DATA';

type AddNeoData = Action<typeof ADD_NEO_DATA> & { neoData: DataPerDay };
type ReloadNeoData = Action<typeof RELOAD_NEO_DATA> & { neoData: DataPerDay };

export const fetchNeoData = () => ({ type: FETCH_NEO_DATA })
export const addNeoData = (neoData: DataPerDay): AddNeoData => ({ type: ADD_NEO_DATA, neoData });
export const reloadNeoData = (neoData: DataPerDay): ReloadNeoData => ({ type: RELOAD_NEO_DATA, neoData });

const initialState: DataPerDay[] = [];

const neoReducer = (state = initialState, action: AddNeoData | ReloadNeoData) => {
  switch(action.type) {
    case ADD_NEO_DATA:
      return [
        ...state,
        {...action.neoData}
      ].slice(-6);

    case RELOAD_NEO_DATA:
    return [
      ...state.map(item => (item.links.self === action.neoData.links.self
        ? { ...action.neoData }
        : item)),
    ];

    default:
      return state;
  }
}

export default neoReducer;
