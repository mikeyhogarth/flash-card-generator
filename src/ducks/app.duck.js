import { createAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { isEmpty, pickBy, identity } from 'lodash';
import { fetchImage } from 'services/image.service';

const CARD_UPDATE_DEBOUNCE_RATE = 300;
const IMAGE_FETCH_DEBOUNCE_RATE = 2500;

/**
 * INITIAL STATE
 */
const initialState = {
  cards: {
    0: { title: "", searchTerm: "", loading: false },
    1: { title: "", searchTerm: "", loading: false },
    2: { title: "", searchTerm: "", loading: false },
    3: { title: "", searchTerm: "", loading: false },
    4: { title: "", searchTerm: "", loading: false },
    5: { title: "", searchTerm: "", loading: false },
    6: { title: "", searchTerm: "", loading: false },
    7: { title: "", searchTerm: "", loading: false },
    8: { title: "", searchTerm: "", loading: false },
  }
}

/**
 * ACTION CREATORS
 */


const updateCard = createAction("updateCard");
export const requestImage = createAction("requestImage");
export const receiveImage = createAction("receiveImage");
export const clearTitle = createAction("clearTitle");
export const clearSearchTerm = createAction("clearSearchTerm");
export const clearImage = createAction("clearImage");

/**
 * REDUCERS
 */
const cards = handleActions({
  [updateCard](state, { payload: { index, title, searchTerm } }) {
    const newAttributes = pickBy({ title, searchTerm }, identity);
    const newCard = Object.assign({}, state[index], newAttributes)
    return { ...state, [index]: newCard };
  },

  [requestImage](state, { payload: { index }}) {
    return { ...state, [index]: Object.assign({}, state[index], { loading: true })}
  },

  [receiveImage](state, { payload: { index, images }}) {
    return { ...state, [index]: Object.assign({}, state[index], { images: images, loading: false })}
  },

  [clearSearchTerm](state, { payload: index }) {
    return { ...state, [index]: Object.assign({}, state[index], { searchTerm: null, loading: false })}
  },

  [clearTitle](state, { payload: index }) {
    return { ...state, [index]: Object.assign({}, state[index], { title: null, loading: false })}
  },

  [clearImage](state, { payload: index }) {
    return { ...state, [index]: Object.assign({}, state[index], { images: null, loading: false })}
  }
}, initialState.cards)

export const updateCardTitle = (index, title) => {
  const thunk = dispatch => {

    isEmpty(title) ? 
      dispatch(clearTitle(index)) : 
      dispatch(updateCard({ index, title }));

    dispatch(updateImageData(index));
  }

  thunk.meta = { 
    debounce: {
      time: CARD_UPDATE_DEBOUNCE_RATE, 
      key: `UPDATE_CARD_TITLE_${index}` 
    } 
  };
  
  return thunk;
}

export const updateCardSearchTerm = (index, searchTerm) => {
  const thunk = dispatch => {

    isEmpty(searchTerm) ? 
      dispatch(clearSearchTerm(index)) :
      dispatch(updateCard({ index, searchTerm }));

    dispatch(updateImageData(index));
  }

  thunk.meta = { 
    debounce: { 
      time: CARD_UPDATE_DEBOUNCE_RATE, 
      key: `UPDATE_CARD_SEARCH_TERM_${index}` 
    } 
  };

  return thunk;
}

const updateImageData = (index) => {

  const thunk = (dispatch, getState) => {
    const { cards } = getState();
    const { title, searchTerm } = cards[index];
    const keywords = isEmpty(searchTerm) ? title : searchTerm;

    dispatch(requestImage({ index }));

    if(!isEmpty(keywords)) {
      fetchImage(keywords)
      .then((response) => {
        dispatch(receiveImage({ index, images: response.value }))
      });
    } else {
      dispatch(clearImage(index))
    }
    
  }

  thunk.meta = { 
    debounce: { 
      time: IMAGE_FETCH_DEBOUNCE_RATE, 
      key: `FETCH_IMAGE_${index}` 
    } 
  };

  return thunk;
}

export default combineReducers({cards});