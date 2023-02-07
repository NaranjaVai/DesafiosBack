const {Router} = require('express');
const realTimeRouter = Router();

realTimeRouter.get('/', (req,res) =>{
    res.render('realTimeProducts', {title:'Productos en tiempo real'})
})

realTimeRouter.post('/', async (req,res) => {
    let aux = req.body;
    console.log(aux)
    require('../app').productAdd(aux);
    res.end();
})

/* realTimeRouter.delete('/:pid', async (req,res) =>{
    let aux = req.params.pid
    require('../app').productDelete(aux);
    res.end();
})
 */
module.exports = realTimeRouter