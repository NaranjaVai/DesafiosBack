const express = require("express");
const session = require('express-session');
const userRouter = require("./routes/user");
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret: 'secretSession',
    resave:false,
    saveUninitialized: false
}))

app.use('/user', userRouter)



const PORT = process.env.PORT || 8080 ;






const server = app.listen(PORT , ()=>{
    console.log(`Server running on port: ${server.address().port}`)
}); 
server.on('error', error => console.log(error)); 


  