import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';
import 'typeface-roboto'
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';

console.log(store)

ReactDOM.render(<React.Fragment>
  <CssBaseline />
  <Provider store={store}>
    <App />
  </Provider>
</React.Fragment>, document.getElementById('root'));