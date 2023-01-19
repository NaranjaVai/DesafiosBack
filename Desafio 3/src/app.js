const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));
const ProductManager =require('./products')
const aux = new ProductManager();

app.get('/', (req,res) =>{  
    res.send('Here I am')
})

app.get('/products/:pId', (req,res) =>{
    let pId = req.params.pId;
    try{        
        let result = aux.getProductsById(pId);
        (!result) ? res.send('Product Not Found') : res.send(result);
    }catch{
        console.log('File Not Found');
    }
})

app.get('/products', (req,res) =>{
    let {limit} = req.query;
    try{
        let result = aux.getProducts();
        if (!limit){
            res.send(result);
        }else{
            let newArr = result.splice(0,limit);
            res.send(newArr);
        }
    }catch{
        console.log('File Not Found');
    }
})

const server = app.listen(8080, () => { console.log('Server listening on 8080');})