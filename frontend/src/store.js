import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
//store accepts 3 parameters 

const initialState = {};
const reducer = combineReducers({
    // reducer is a function get state and action, 
    // return a new state based on that action
    //
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//compose applyMiddleware is for async action
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;