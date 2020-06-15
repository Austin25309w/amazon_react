import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';


const HomeScreen = (props) =>{
    //define react hook
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();

    useEffect(() =>{
        //fectch data from server, data containst real data.
        // const fetchData = async ()=> {
        //     const {data} = await axios.get("/api/products");
        //     setProduct(data);
        // }
        // fetchData();
        dispatch(listProducts());


        return () => {
            // 
        };
    },[])
    // if not longing, return error messa. if loading, return products
    return loading? <div>Loading...</div> :
              error ? <div>{error}</div> :
              <ul className="products">
                                  {
                                    products.map(product => 
                                    <li key ={product._id}>
                                      <div className="product">
                                        
                                            <div className="product-name">
                                                <Link to={ '/product/' + product._id}><img className="product-image" src ={product.image} alt ="product"/></Link>
                                            </div>
                                            <div className="product-brand">{product.brand}</div>
                                            <div className="product-price">{product.price}</div>
                                    <div className="product-rating">{product.rating} Stars ({product.numReview })</div>
                                      </div>
                                    </li>)
                                  }
                                  </ul>}

export default HomeScreen;