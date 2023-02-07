const {Router} = require('express');
const {showProducts,productAdd, productDelete } = require('../app.js');
const realTimeRouter = Router();

realTimeRouter.get('/', (req,res) =>{
    console.log(`${showProducts()}`);
    res.render('realTimeProducts', showProducts())
})

realTimeRouter.post('/', async (req,res) => {
    let aux = req.body;
    productAdd(aux);
    res.end();
})

realTimeRouter.delete('/:pid', async (req,res) =>{
    let aux = req.params.pid
    productDelete(aux);
    res.end();
})

module.exports = realTimeRouter