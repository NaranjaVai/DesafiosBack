const { log } = require('console');
const express = require('express');
const fs = require('fs');
const path = require('path');
const { dirname } = require('path');
const app = express();
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res) =>{  
    res.send('Here I am')
})

app.get('/products/:pId', async (req,res) =>{
    let pId = req.params.pId;
    try{        
        let result = JSON.parse(await fs.promises.readFile(path.resolve(__dirname, '\products.json') , 'utf-8'))
        let product = result.find(e => e.id == pId);
        (!product) ? res.send('Product Not Found') : res.send(product); 
    }catch{
        console.log('File Not Found');
    }
})

app.get('/products', async (req,res) =>{
    let {limit} = req.query;
    try{
        let result = JSON.parse(await fs.promises.readFile(path.resolve(__dirname, '\products.json') , 'utf-8'))
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