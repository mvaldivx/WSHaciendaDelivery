var connection = require("../../connection.js");
var express = require('express');

const router = express.Router();


router.get('/getInfoNegocio',(req,res)=>{
    if(!req.query.IdNegocio)  res.sendStatus(400)
    else{
        var query = "SELECT IdNegocio, IdCategoria, Descripcion, Estatus, Negocio, Abierto "
        +   " FROM negocios WHERE IdNegocio = "
        +   connection.escape(req.query.IdNegocio)
        connection.query(query,(err,result,fields)=>{
            if(err) res.sendStatus(500)
            res.send(result)
        })
    }
})

router.post('/UpdateNegocio',(req,res)=>{
    if(!req.body.params.IdNegocio)  res.sendStatus(400)
    else{
        var query = "UPDATE negocios SET Descripcion = " + connection.escape(req.body.params.Descripcion)
        + " , Negocio = " + connection.escape(req.body.params.Negocio)
        + " WHERE IdNegocio = " +  + connection.escape(req.body.params.IdNegocio);
        connection.query(query,(err,result,fields)=>{
            if(err) res.sendStatus(500)
            else{
                res.send(result)
            }
        })
    }
})

module.exports = router;