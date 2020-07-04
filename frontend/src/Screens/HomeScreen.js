import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';



const HomeScreen = (props) => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortOrder, setSortOrder] = useState('')
    const category = props.match.params.id ? props.match.params.id : '';
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
        dispatch(listProducts(category));
        return () => {
            // 
        };
    },[category])

    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(listProducts(category, setSearchKeyword, sortOrder))
    }

    const sortHandler = (e) => {
      setSortOrder(e.target.value);
      dispatch(listProducts(category, searchKeyword, sortOrder))
    }
    // if not longing, return error messa. if loading, return products
    return <>
      {category && 
      <h2>{category}</h2>}

      <ul className ="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input naume="searchKeyword" onChange={(e) => setSearchKeyword(e.target.value)}/>
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
          Sort By{' '}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="newest">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
      </ul>

      { loading ? <div>Loading...</div> :
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
          </ul>
          }
        </>
      }
export default HomeScreen;