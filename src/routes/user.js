const { Router } = require('express')
const userRouter = Router();
const {auth} = require('../middlewares/auth')

userRouter.get("/login", (req, res) =>{
    if(req.session.counter){
        req.session.counter++
        res.send(`visited ${req.session.counter} times`)
    }else{
        let name = req.query.nombre ? req.query.nombre : '';
        req.session.counter = 1;
        req.session.name = name
    }
    res.send(`Welcome ${req.session.name} to the site`);
})

userRouter.get("/loginAdmin", (req, res) =>{
    if(req.session.counter){
        req.session.counter++
        res.send(`visited ${req.session.counter} times`)
    }else{
        let name = req.query.nombre ? req.query.nombre : '';
        req.session.counter = 1;
        req.session.name = name
        req.session.admin = true;
    }
    res.send(`Welcome ${req.session.name} to the site`);
})

userRouter.get('/private', auth, (req,res) =>{
    res.send('Private site'); 
})

module.exports = userRouter;