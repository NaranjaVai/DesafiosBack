const express= require('express');
const handlebars = require('express-handlebars');
const app = express();
const {Server} = require('socket.io');
const ProductManager = require('./productManager');
const productRouter = require('./routes/product');
const realTimeP = require('./routes/realTimeP');
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars')
app.set('views', './src/views');
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/product', productRouter);
app.use('/api/realtimeproducts', realTimeP);
let products = [];
const aux = new ProductManager();
const PORT = 8080;

(async () => products = await aux.getProducts())();

app.get('/', (req,res) =>{
    res.render('home', {products})
} )

const httpServer = app.listen(PORT, () => console.log('Server runing on PORT 8080'));
httpServer.on('error', error => console.log(error))
const io =new Server(httpServer)
io.on('connection', socket => {
    console.log('Nuevo Usuario')
    socket.emit('Productos', products);
}) 

module.exports = {
    PORT,
    httpServer,
     showProducts: async () =>{
       return await aux.getProducts();
    },
    productAdd: async (p) => {
       return await aux.addProduct(p)
    },
    productDelete: async (pID) =>{
       return await aux.removeById(pID);
    }  //problemas de dependencia circular (cant solve)}
     
}