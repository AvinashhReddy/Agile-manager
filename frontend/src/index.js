import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore} from 'redux'
import { Provider } from 'react-redux'

import {combineReducers} from 'redux'

function user(state=localStorage.getItem('user'),action){
if(action.type==="a"){

return action.payload}
else

return state
}
function logInCheck(state=true,action){
  if(action.type==='IN')
  return false
  else
  return true
}
const all=combineReducers({user,logInCheck})
const store=createStore(all);


ReactDOM.render(
  <Provider store={store}>
 
   
    <App />
   
    
 
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
