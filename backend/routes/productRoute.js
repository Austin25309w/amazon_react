import express from 'express';
import Product from '../models/productModel';
import { isAdmin, isAuth } from '../util';

const router = express.Router();

router.get("/", async(req, res) =>{
    const products = await Product.find({});
    res.send(products);
    console.log("product data sent out...")
});

router.get("/:id", async(req, res) =>{
    const product = await Product.findOne({_id: req.params.id});
    if(product){
        res.send(product);
        console.log("product found")
    } else {
        res.status(404).send({message: "product not found"});

    }
});

router.post('/', async (req, res) => {
    console.log('product route post function')
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        description: req.body.description,
    });
    console.log('product')
    const newProduct = await product.save();
    if(newProduct){
        return res.status(201).send({
            message: 'New Product Created', 
                data: newProduct
            });    
    }
    return res.status(500).send({message: 'Error in Creating Product.'})
})


router.put('/:id', isAuth, isAdmin, async (req, res) => {
    console.log('product route put function update')
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product){
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        // product.rating = req.body.rating;
        product.description = req.body.description;
    }
    console.log('update product')
    const updatedProduct = await product.save();
    if(updatedProduct){
        return res.status(201).send({
            message: 'New Product Update', 
                data: updatedProduct
            });    
    }
    return res.status(500).send({message: 'Error in Updating Product.'})
})

router.delete('/:id', isAuth, isAdmin, async (req, res) =>
{
    const deletedProduct = await Product.findById(req.params.id);
    if(deletedProduct){
        await deletedProduct.remove();
        res.send({message: "Product Deleted"})
    } else {
        res.send("Error in deletion.");
    }
})

export default router;