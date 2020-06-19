import axios from "axios";
import Cookie from "js-cookie";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

//function expression
const addToCart = (productId, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get("/api/products/" + productId);
        dispatch({
            type: CART_ADD_ITEM, payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
                } 
        })
        // save cartItems into cookies 
        const { cart: { cartItems }} = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
    } catch (error){

    }
}

const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });

    const { cart: { cartItems }} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}
// action is to dispatch data from database
export { addToCart, removeFromCart }