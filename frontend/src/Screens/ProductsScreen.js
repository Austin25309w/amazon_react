import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';



function ProductsScreen (props){

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;
    const dispatch = useDispatch();
    // const redirect = props.location.search ? props.location.search.split('=')[1]: '/';

    useEffect(() => {
        if(userInfo){
            props.history.push('/');
        }
               
        return () => {
            //
        };
    }, [userInfo]); 

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
        console.log('SigninScreen')
    }

    return <div className="form">
        <form onSubmit = {submitHandler}>
            <ul className ="form-container">
                <li>
                    <h2>Sign-In</h2>
                </li>
                <li className="error_msg">
                   {loading && <div>Loading...</div>} 
                   {error && <div>{error}</div>}
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" onChange={ (e) => setEmail(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={ (e) => setPassword(e.target.value)}>        
                    </input>
                </li>
                <li>
                    <button type="submit" className="button primary">Sign in</button>
                </li>
                <li>
                    New to amazon_react?
                </li>
                <li>
                    <Link to="/register" className="button secondary text-center"> Create your amazon_react account</Link>
                </li>
            </ul>
        </form> 
    </div>
}

export default ProductsScreen;