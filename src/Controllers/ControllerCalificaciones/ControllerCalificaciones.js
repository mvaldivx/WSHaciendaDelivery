var connection = require("../../connection.js");
var express = require('express');

const router = express.Router();

router.get('/getResenias',(req,res)=>{
    if(!req.query.IdNegocio)  res.sendStatus(400)
    else{
        var query = "SELECT rs.IdResenia, rs.IdNegocio, rs.IdUsuario, rs.IdPedido, rs.Calificacion, rs.Comentario,"
        + "rs.Fecha, u.Nombre FROM resenias rs JOIN usuarios u ON rs.IdUsuario = u.IdUsuario "
        + " where rs.IdNegocio = "
         + connection.escape(req.query.IdNegocio) 
         + " ORDER BY rs.Fecha Desc"
        connection.query(query,(err,result,fields)=>{
            if(err){ 
                console.log(err)
                res.sendStatus(500);
            } 
            res.send(result)
        })
    }
})

router.post('/insertaResenia',(req, res)=>{
    if(!req.body.params)  res.sendStatus(400)
    else{
        var params=  req.body.params
        var query = "INSERT INTO resenias SET ?"
        connection.query(query,params,(err,result,fields)=>{
            if(err){
                console.log('Calificaciones','insertaResenia',err.sqlMessage)
                res.sendStatus(500)
            } 
            res.send(result)
        })
    }
});

router.get('/PedidoCalificado',(req,res)=>{
    if(!req.query.IdPedido)  res.sendStatus(400)
    else{
        var query = "SELECT COUNT(IdResenia) AS Calificado FROM resenias where IdPedido = "
         + connection.escape(req.query.IdPedido) 
        connection.query(query,(err,result,fields)=>{
            if(err){ 
                console.log(err)
                res.sendStatus(500);
            } 
            res.send(result)
        })
    }
});

module.exports = router;