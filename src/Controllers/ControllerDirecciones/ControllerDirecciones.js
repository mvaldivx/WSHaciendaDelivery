var connection = require("../../connection.js");
var express = require('express');

const router = express.Router();

router.get('/getDirecciones',(req,res)=>{
    if(!req.query.IdUsuario)  res.sendStatus(400)
    else{
        var query = "SELECT * FROM direcciones where IdUsuario = "
         + connection.escape(req.query.IdUsuario) 
        connection.query(query,(err,result,fields)=>{
            if(err){ 
                console.log(err)
                res.sendStatus(500);
            } 
            res.send(result)
        })
    }
})

router.get('/buscaDireccionReplicada',(req,res) =>{
    if(!req.query.Numero || !req.query.IdUsuario || !req.query.Calle)  res.sendStatus(400)
    else{
        var query = "SELECT * FROM direcciones where IdUsuario" + req.query.IdUsuario
         + " AND Calle = " + req.query.Calle 
         + " AND Numero = " + req.query.Numero
        connection.query(query,(err,result,fields)=>{
            if(err){
                console.log(err)
                res.sendStatus(500);
            }
            res.send(result)
        })  
    }
})

router.get('/getDireccionActual',(req,res) =>{
    if(!req.query.IdUsuario)  res.sendStatus(400)
    else{
        var query = "SELECT * FROM direcciones where IdUsuario = " + req.query.IdUsuario
         + " AND selected = 1"
        connection.query(query,(err,result,fields)=>{
            if(err){
                console.log(err)
                res.sendStatus(500);
            }
            res.send(result)
        })  
    }
})

router.post('/AgregaDireccion',(req,res) => {
    if(!req.body.params)  res.sendStatus(400)
    else{
        var params=  req.body.params
        var query = "INSERT INTO direcciones SET ?"
        connection.query(query,params,(err,result,fields)=>{
            if(err){
                res.sendStatus(500)
            } 
            res.send(result)
        })
    }
})

router.post('/CambiarEstatusDefault',(req,res) => {
    if(!req.body.params)  res.sendStatus(400)
    else{
        var params=  req.body.params
        var query = "UPDATE direcciones SET selected = " + req.body.params.selected
        + " where IdUsuario = " + req.body.params.IdUsuario 
        + " AND IdDireccion = " + req.body.params.IdDireccion
        connection.query(query,params,(err,result,fields)=>{
            if(err){
                console.log('CambiarEstatusDefault',err.sql,req.body.params)
                res.sendStatus(500)
            } 
            res.send(result)
        })
    }
})

router.post('/EliminarDireccion',(req,res) => {
    if(!req.body.params) res.sendStatus(400)
    else{
        var params = req.body.params
        var query = "DELETE FROM direcciones where IdDireccion = " + connection.escape(params.IdDireccion) 
        + " AND IdUsuario = " + connection.escape(params.IdUsuario)
        connection.query(query,(err,result,fields) =>{
            if(err){
                console.log('EliminarDireccion',err,params)
                res.sendStatus(500)
            }
            res.send(result)
        }) 
    }
})


module.exports = router;