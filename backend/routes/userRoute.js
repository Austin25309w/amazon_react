import express from 'express';
import User from '../models/userModel';
import { getToken, isAdmin, isAuth } from '../util';

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
router.put('/:id', isAuth, async (req, res) => {
    console.log("updated route")
    const userId = req.params.id;
    const user = await User.findById(userId);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: getToken(updatedUser)
        })
    } else {
        res.status(404).send({msg: 'User not found'});
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