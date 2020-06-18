import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
        PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, 
        PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL} from "../constants/productConstants"
import axios from "axios";


// dispatch has a type and payload
// for product list
const listProducts = () => async (dispatch) => {
try {

    dispatch ({ type: PRODUCT_LIST_REQUEST});
    // axios get data from server
    const { data } = await axios.get("/api/products");
    //dispatch return data from server
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
}

catch(error){
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
    }
}  

const saveProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
        const { userSignin: { userInfo }} = getState();
        console.log('save products function')
        const { data } = await axios.post("/api/products", product, {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        })
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
        console.log('successfully dispatched')
    } catch (error){
        dispatch({
            type: PRODUCT_SAVE_FAIL, payload: error.message
        });
    }
}


const detailsProduct = (productId) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId });
        const { data } = await axios.get("/api/products/" + productId);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})
    }
    catch(error){
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.message });
    }
}

export { listProducts, detailsProduct, saveProduct }