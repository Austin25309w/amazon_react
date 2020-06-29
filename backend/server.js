import express from 'express';
import data from './data';
import mongoose from  'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import config from './config';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';

// bodyParser is a middleware for express to provide 
// data that user enter into data post request into node application
dotenv.config();
const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

const app = express();
app.use(bodyParser.json());

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.get("/api/config/paypal", (req,res) => {
    console.log('paypal route in server')
    res.send(config.PAYPAL_CLIENT_ID);
})
// app.get("/api/products", (req, res) => {
//     res.send(data.products);
//     console.log("product data sent out...")
// })
// app.get("/api/products/:id", (req, res) => {
//     const productId = req.params.id; 
//     const product = data.products.find(x=>x._id === productId)
//     if(product)
//         res.send(product);
//     else
//         res.status(404).send({msg:" Product not found "})

// })


app.listen(5000, () => { console.log("Server started at http://localhost:5000") });



// xhr.js:178 PUT http://localhost:3000/api/orders/5efa42d1237a0e5766771b8e/pay 404 (Not Found)
// Cannot PUT /api/orders/5efa42d1237a0e5766771b8e/pay