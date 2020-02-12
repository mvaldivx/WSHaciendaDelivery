var connection = require("../../connection.js");
var express = require('express');

const router = express.Router();


router.get('/getUsuario',(req,res)=>{
    if(!req.query.UID)  res.sendStatus(400)
    else{
        var query = "SELECT * FROM usuarios Where UID=" + connection.escape(req.query.UID)
        connection.query(query,(err,result,fields)=>{
            if(err) res.sendStatus(500)
            res.send(result)
        })
    }
})

router.post('/registrarUsuario',(req,res)=>{
    if(!req.body.params)  res.sendStatus(400)
    else{
        var params=  req.body.params.usuario
        var fechaRegistro = new Date(params.registradoEl)
        var fechanacimiento = new Date(params.FechaNacimiento)
        var query = "INSERT INTO usuarios (UID,Nombre,registradoEl,Fechanacimiento,telefono) VALUES ("
        + connection.escape(params.UID) + ',' + connection.escape(params.Nombre) + 
        ","  +  connection.escape(fechaRegistro) + 
        "," + connection.escape(fechanacimiento) + 
        "," + connection.escape(params.telefono) + ")"
        connection.query(query,(err,result,fields)=>{
            if(err){
                console.log(err)
                res.sendStatus(500)
            } 
            res.send(result)
        })
    }
})


router.get('/getPlayerId',(req,res)=>{
    if(!req.query.IdUsuario)  res.sendStatus(400)
    else{
        var query = "SELECT * FROM playerid Where IdUsuario=" + connection.escape(req.query.IdUsuario) + 
        " AND playerId = "  + connection.escape(req.query.playerId) 
        connection.query(query,(err,result,fields)=>{
            if(err) {
                res.sendStatus(500)
            }
            res.send(result)
        })
    }
})

router.post('/InsertPlayerId',(req,res)=>{
    if(!req.body.params.IdUsuario)  res.sendStatus(400)
    else{
        var query = "INSERT INTO playerid  SELECT u.IdUsuario, " + connection.escape(req.body.params.playerId)
        + " FROM usuarios u Where u.IdUsuario = " + connection.escape(req.body.params.IdUsuario) 
        connection.query(query,(err,result,fields)=>{
            if(err){
                console.log(err)
                res.sendStatus(500)
            } 
            res.send(result)
        })
    }
})

router.get('/getPlayersId',(req,res)=>{
    if(!req.query.IdUsuario)  res.sendStatus(400)
    else{
        var query = "SELECT * FROM playerid Where IdUsuario=" + connection.escape(req.query.IdUsuario)
        connection.query(query,(err,result,fields)=>{
            if(err) {
                res.sendStatus(500)
            }
            res.send(result)
        })
    }
})

module.exports = router;