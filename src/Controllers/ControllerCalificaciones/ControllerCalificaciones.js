var connection = require("../../connection.js");
var express = require('express');

const router = express.Router();

router.get('/getResenias',(req,res)=>{
    if(!req.query.IdNegocio)  res.sendStatus(400)
    else{
        var query = "SELECT * FROM resenias where IdNegocio = "
         + connection.escape(req.query.IdNegocio) 
        connection.query(query,(err,result,fields)=>{
            if(err){ 
                console.log(err)
                res.sendStatus(500);
            } 
            res.send(result)
        })
    }
})

module.exports = router;