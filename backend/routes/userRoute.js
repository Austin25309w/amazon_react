import express from 'express';
import User from '../models/userModel';
import { getToken } from '../util';

const router = express.Router();
// This is fucking nut! router.post('./signin'
// took me forever to solve this bug!!!
router.post('/signin', async (req, res) => {
    console.log("signin route")
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if(signinUser){
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
        });

    } else {
        res.status(401).send({msg: "invalid email or Password"});
    }

});

router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const newUser = await user.save();
    if(newUser){
        console.log("register route")
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        })

    } else {
        res.status(401).send({msg: "invalid user Data"});
    }

});

router.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
            name: 'nic',
            email: 'nic@gmail.com',
            password: '1234',
            isAdmin: true
        });
        const newUser = await user.save();
        res.send(newUser);
        
    } catch (error){
        res.send({msg: error.message});
    }
})

export default router;