import { useEffect } from "react";
import Axios from "axios";
import React from 'react';
import axios from 'axios'

function  PaypalButton(props){
    const addPaypalSdk = async () => {
        const result = await axios.get("/api/config/paypal");
        const clientID = result.data;
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.paypal.com/sdk/js?client-Id=' + clientID;
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        }
    }
    //load paypal script
    useEffect(() => {
        if(!window.paypal){
            addPaypalSdk();
        }
    })
}

export default PaypalButton;