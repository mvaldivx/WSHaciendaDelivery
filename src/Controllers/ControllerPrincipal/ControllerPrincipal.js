var connection = require("../../connection.js");
var express = require('express');

const router = express.Router();

router.get('/getCategorias',(req,res)=>{
    connection.query("SELECT * FROM categorias",(err,result,fields)=>{
        if(err) {
            console.log(err)
            res.sendStatus(500);
        }
        res.send(result)
    })
})

router.get('/getNegocios',(req,res)=>{
    if(!req.query.idCategoria)  res.sendStatus(400)
    else{
        var query = "SELECT IdCategoria, IdNegocio, Descripcion, Estatus, Negocio,"
        + " IF(Calificacion != -1,IF(NCAL != 0,Calificacion / NCAL,-1),-1) AS Calificacion"
        + " FROM ("
        + " SELECT n.IdCategoria, n.IdNegocio, n.Descripcion, n.Estatus, n.Negocio, SUM(IF(ISNULL(r.Calificacion) = 1 ,-1,r.Calificacion))  AS Calificacion" 
        + ", COUNT(IF(ISNULL(r.Calificacion) = 1 ,0,1)) AS NCAL"
        + " FROM negocios n " 
        + " LEFT JOIN resenias r ON n.IdNegocio = r.IdNegocio"  
        + " Where IdCategoria=" + connection.escape(req.query.idCategoria)
        + " AND Estatus = 1"
        + " GROUP BY n.IdCategoria, n.IdNegocio, n.Descripcion, n.Estatus, n.Negocio) AS  Calif"
        connection.query(query,(err,result,fields)=>{
            if(err){
                console.log(err.sqlMessage)
                res.sendStatus(500)
            } 
            res.send(result)
        })
    }
})

router.get('/getProductos',(req,res)=>{
    if(!req.query.idNegocio) res.sendStatus(400)
    else{
        var query = "SELECT IdProducto, IdNegocio ,Precio, Producto, Descripcion FROM productos WHERE idNegocio=" 
        + connection.escape(req.query.idNegocio)
        + " AND Estatus = 1"
        connection.query(query,(err,result,fields)=>{
            if(err) res.sendStatus(500)
            res.send(result)
        })
    }
})

router.get('/getProducto',(req,res)=>{
    if(!req.query.idProducto) res.sendStatus(400)
    else{
        var query = "SELECT IdProducto,IdNegocio,Precio, Producto, Descripcion FROM productos WHERE IdProducto="
        + connection.escape(req.query.idProducto)
        connection.query(query,(err,result,fields)=>{
            if(err){
                console.log('getProducto',err.sql,req.query)
                res.status(500) 
                res.send(err)
            }
            res.send(result)
        })
    }
})

module.exports = router;