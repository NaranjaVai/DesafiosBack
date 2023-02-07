const express= require('express');
const handlebars = require('express-handlebars');
const app = express();
const {Server, Socket} = require('socket.io');
const {getProducts, addProduct, removeById } = require('./productManager');
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars')
app.set('views', './src/views');
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
let products = [];
(() => products = getProducts())();

app.get('/', (req,res) =>{
    res.render('home', {products})
} )

const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log('Server runing on PORT 8080'));
httpServer.on('error', error => console.log(error))
const io = Server(httpServer)

io.on('connection', socket => {
    console.log('Nuevo Usuario')
    socket.emit('Productos', products);
}) 

