var connection = require("../../connection.js");
var express = require('express');

const router = express.Router();

router.get('/getNegocios',(req,res)=>{
    var query = "SELECT n.IdNegocio, n.IdCategoria, n.Descripcion,"
    + " n.Estatus, n.Negocio, IF(n.Abierto=1,TRUE,FALSE) AS Abierto,"
    + " c.Categoria, u.Nombre, u.Telefono FROM negocios n"
    + " LEFT JOIN Categorias c ON n.IdCategoria = c.Id"
    + " LEFT JOIN usuarionegocio un ON un.IdNegocio = n.IdNegocio"
    + " LEFT JOIN usuarios u ON u.IdUsuario = un.IdUsuario LIMIT 1"
    connection.query(query,(err,result,fields)=>{
        if(err){
            console.log('getNegocios','ControllerNegociosAdmin',err.sqlMessage)
            res.sendStatus(500)
        }
        res.send(result)
    })
})

router.post('/UpdateNegocio',(req,res)=>{
    if(!req.body.params.Negocio)  res.sendStatus(400)
    else{
        var params = req.body.params.Negocio
        var query = "UPDATE negocios set Descripcion  = '" + params.Descripcion + "' ,"
        + " Negocio = '" + params.Negocio + "' , Estatus = " + ((params.Estatus)? 1: 0) + ","
        + " Abierto = " + ((params.Abierto)? 1:0) + ", IdCategoria = " + params.IdCategoria 
        + " WHERE IdNegocio = " + params.IdNegocio;
        connection.query(query,(err,result,fields) => {
            if(err){
                console.log('UpdateNegocio/Update', 'ControllerNegociosAdmin', err.sqlMessage);
                res.sendStatus(500);                
            }else{
                var fail = false
                req.body.params.cambios.forEach(element => {
                    var insertHist = "INSERT INTO hcambiosnegocios (IdNegocio, Campo, ValorAnt, Fecha, Usuario) "
                    + " VALUES (" + params.IdNegocio + " , '" + element.campo + "' , '"  +element.valorAnt + "' , "
                    + " current_timestamp() , '" + element.Usuario + "')"

                    connection.query(insertHist, (errins,resultins,fieldsins) =>{
                        if(errins){
                            console.log('UpdateNegocio/InsertHistorico', 'ControllerNegociosAdmin', errins.sqlMessage);
                            fail = true
                        }
                    })
                });
                if(fail){
                    res.sendStatus(500); 
                }else{
                    res.send(result);
                }
            }
        })
    }
})

module.exports = router;