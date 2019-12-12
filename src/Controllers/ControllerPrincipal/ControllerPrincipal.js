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
        var query = "SELECT * FROM negocios Where idCategoria=" + connection.escape(req.query.idCategoria)
        connection.query(query,(err,result,fields)=>{
            if(err) res.sendStatus(500)
            res.send(result)
        })
    }
})

router.get('/getProductos',(req,res)=>{
    if(!req.query.idNegocio) res.sendStatus(400)
    else{
        var query = "SELECT IdProducto, idNegoc AS IdNegocio ,Precio, Producto, Descripcion FROM productos WHERE idNegoc=" 
        + connection.escape(req.query.idNegocio)
        connection.query(query,(err,result,fields)=>{
            if(err) res.sendStatus(500)
            res.send(result)
        })
    }
})

router.get('/getProducto',(req,res)=>{
    if(!req.query.idProducto) res.sendStatus(400)
    else{
        var query = "SELECT IdProducto, IdNegoc as IdNegocio,Precio, Producto, Descripcion FROM productos WHERE idProducto="
        + connection.escape(req.query.idProducto)
        connection.query(query,(err,result,fields)=>{
            if(err){
                res.status(500) 
                res.send(err)
            }
            res.send(result)
        })
    }
})

module.exports = router;