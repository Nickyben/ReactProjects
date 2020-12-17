import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import App from './App';
import authReducer from './reduxStore/reducers/authReducer';
//import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
	authReducer: authReducer,
	
});


const reduxStore = createStore(rootReducer, applyMiddleware(ReduxThunk));


ReactDOM.render(
	<Provider store={reduxStore}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);

//serviceWorker.unregister();
