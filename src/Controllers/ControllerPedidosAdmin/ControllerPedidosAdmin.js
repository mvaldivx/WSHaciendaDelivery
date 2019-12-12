var connection = require("../../connection.js");
var express = require('express');

const router = express.Router();

router.get('/getPedidos',(req,res)=>{
    if(!req.query.estatus)  res.sendStatus(400)
    else{
        var query = "SELECT IdPedido, IdUsuario, Calle, Estatus,Numero, FechaConcluido,FechaPedido,Total, lat,lng FROM pedidos where Estatus = "
         + connection.escape(req.query.estatus) 
         + " ORDER BY FechaPedido DESC"
        connection.query(query,(err,result,fields)=>{
            if(err){ 
                console.log(err)
                res.sendStatus(500);
            } 
            res.send(result)
        })
    }
})

router.post('/changeStatus',(req,res) =>{
    if(!req.body.params.Estatus)  res.sendStatus(400)
    else{
        var query = "UPDATE pedidos SET Estatus = " + connection.escape(req.body.params.Estatus)
        + " WHERE IdPedido = " + connection.escape(req.body.params.IdPedido)
        connection.query(query,(err,result,fields)=>{
            if(err){
                console.log(err)
                res.sendStatus(500);
            }
            req.app.io.emit('StatusWasChanged', req.body.params);
            res.send(result)
        })  
    }
})


module.exports = router;