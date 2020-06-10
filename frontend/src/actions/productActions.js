import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from "../constants/productConstants"
import axios from "axios";


// dispatch has a type and payload
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

export { listProducts }