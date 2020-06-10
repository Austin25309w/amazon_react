import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const HomeScreen = (props) =>{
    //define react hook
    const [products, setProduct] = useState([])
    useEffect(() =>{
        //fectch data from server, data containst real data.
        const fetchData = async ()=> {
            const {data} = await axios.get("/api/products");
            setProduct(data);
        }
        fetchData();
        return () => {
            // 
        };
    },[])

    return <ul className="products">
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