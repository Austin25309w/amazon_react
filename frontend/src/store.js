import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from "js-cookie";
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userSigninReducer, userRegisterReducer } from './reducers/userReducers';
//store accepts 3 parameters 

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON('userInfo') || null;
// keep cartItems in a cart 
const initialState = { cart: { cartItems }, userSignin: {userInfo} };
// combine reducers in store hold all reducers (reducers handle logics)
const reducer = combineReducers({
    // reducer is a function get state and action, 
    // return a new state based on that action
    //
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//compose applyMiddleware is for async action
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;