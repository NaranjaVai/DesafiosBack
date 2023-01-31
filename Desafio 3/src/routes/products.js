const {Router} = require('express');
const productRouter = Router();
const ProductManager = require('../productManager')
const aux = new ProductManager();


productRouter.get('/', async (req,res) =>{
    let {limit} = req.query;
    try{
        let result = await aux.getProducts();
        if (!limit){
            res.send(result);
        }else{
            let newArr = result.splice(0,limit);
            res.send(newArr);
        }
    }catch(e){
        res.status(500).send({error : e});
    }
})

productRouter.get('/:pId', async (req,res) =>{
    let pId = req.params.pId;
    try{        
        let result = await aux.getProductsById(pId);
        (!result) ? res.status(400).send({status: 'Not Found', error : 'Id no existe'}) : res.send(result);
    }catch(e){
        res.status(500).send({error : e});
    }
})  

productRouter.post('/', async (req,res) => {
    try{
        let result =  aux.addProduct(req.body)
        (result === 'Error') ? res.send({error : 'Faltan campos'}) : res.send(`Producto agregado ${req.body}`);
    }catch(error) {
        res.status(500).send({error: error})
    }

})

productRouter.put('/:pid', (req,res) => {
    try{
        let result =  aux.updateProduct(req.params.pid)
        (result === 'Error') ? res.send({error : 'El producto no existe'}) : res.send(`Producto con ${req.params.pid} actualizado con exito`);
    }catch(error) {
        res.status(500).send({error: error})
    }
})

productRouter.delete('/:pid', (req,res) =>{
    try{
        let result =  aux.removeById(req.params.pid)
        (result === 'Error') ? res.send({error : 'El producto no existe'}) : res.send(`Producto con ${req.params.pid} borrado con exito`);
    }catch(error) {
        res.status(500).send({error: error})
    }
})


module.exports = productRouter;