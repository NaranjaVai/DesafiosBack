const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const cartRouter = require('./routes/cart')
const productRouter = require('./routes/products')

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.get('/', (req,res) =>{
    res.send('Home')
})

const server = app.listen(8080, () => { console.log('Server listening on 8080');})
server.on("error", e => console.log(e))