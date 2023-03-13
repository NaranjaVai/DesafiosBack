const auth = (req,res,next) =>{
    if(req.session.admin){
        next()
    }else{
        res.send('you are not the admin')
    }
}

module.exports = {auth}