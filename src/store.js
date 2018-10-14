
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import createDebounce from 'redux-debounced';
import appReducer from 'ducks/app.duck';
import thunk from 'redux-thunk';

const store = createStore(appReducer, composeWithDevTools(
  applyMiddleware(
    createDebounce(),
    thunk
  )
));

export default store;