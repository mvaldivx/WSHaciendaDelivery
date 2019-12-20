var connection = require("../../connection.js");
var express = require('express');

const router = express.Router();

router.get('/getPedidos',(req,res)=>{
    if(!req.query.idUsuario)  res.sendStatus(400)
    else{
        var query = "SELECT * FROM pedidos where IdUsuario = " + connection.escape(req.query.idUsuario) + " ORDER BY FechaPedido DESC"
        connection.query(query,(err,result,fields)=>{
            if(err) res.sendStatus(500);
            res.send(result)
        })
    }
})

router.post('/CreaPedido',(req,res)=>{
    if(!req.body.params.pedido)  res.sendStatus(400)
    else{
        var params=  req.body.params.pedido
        var fechaPedido = new Date(params.FechaPedido)
        var fechaConcluido = new Date(params.FechaConcluido)
        var query = "INSERT INTO pedidos (IdUsuario,Calle,Estatus,Numero,FechaConcluido,FechaPedido,Total,lat,lng) VALUES ("
        + connection.escape(params.IdUsuario) + ',' + connection.escape(params.Calle) + 
        ","  +  connection.escape(params.Estatus) + 
        "," + connection.escape(params.Numero) + 
        "," + connection.escape(fechaConcluido) +
        "," + connection.escape(fechaPedido) +
        "," + connection.escape(params.Total) +
        "," + connection.escape(params.lat) +
        "," + connection.escape(params.lng) + ")"
        connection.query(query,(err,result,fields)=>{
            if(err){
                res.sendStatus(500)
            }
            req.body.params.detalle.forEach(det =>{
                var insertaDetalle = "INSERT INTO detallepedido (IdPedido,IdNegocio,IdProducto, Precio,ComentsAdi, Cantidad) VALUES ("+
                result.insertId + ','
                + connection.escape(det.Producto.IdNegocio) + ',' 
                + connection.escape(det.Producto.IdProducto) + ',' 
                + connection.escape(det.Producto.Precio) + "," 
                + connection.escape((det.ComentsAdi!= null)?det.ComentsAdi:'') + ","
                + connection.escape(det.Cantidad) +
                ")"
                connection.query(insertaDetalle,(err,result,fields)=>{
                })
            })
            
            res.send(result)
        })
    }
})

router.post('/GuardaDetallePedido',(req,res)=>{
    if(!req.body.params)  res.sendStatus(400)
    else{
        var params=  req.body.params
        var query = "INSERT INTO pedidos SET ?"
        connection.query(query,params,(err,result,fields)=>{
            if(err){
                res.sendStatus(500)
            } 
            res.send(result)
        })
    }
})

router.get('/getPedido',(req,res)=>{
    if(!req.query.IdPedido) res.sendStatus(400)
    else{
        var query = "SELECT * FROM pedidos Where IdPedido=" + connection.escape(req.query.IdPedido)
        connection.query(query,(err,result,fields)=>{
            if(err){
                res.sendStatus(500)
            }
            res.send(result)
        })
    }
})

router.get('/getDetallePedido',(req,res)=>{
    if(!req.query.IdPedido) res.sendStatus(400)
    else{
        var query = "SELECT * FROM detallepedido Where IdPedido=" + connection.escape(req.query.IdPedido)
        connection.query(query,(err,result,fields)=>{
            if(err){
                res.sendStatus(500)
            }
            res.send(result)
        })
    }
})



module.exports = router;