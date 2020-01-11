var connection = require("../../connection.js");
var express = require('express');

const router = express.Router();


router.get('/getMisNegocios',(req,res)=>{
    if(!req.query.IdUsuario)  res.sendStatus(400)
    else{
        var query = "SELECT n.IdNegocio, n.IdCategoria, n.Negocio, n.Estatus FROM negocios n JOIN "
        + " usuarionegocio un ON n.IdNegocio = un.IdNegocio"
        + " WHERE un.IdUsuario =" + connection.escape(req.query.IdUsuario)
        connection.query(query,(err,result,fields)=>{
            if(err) res.sendStatus(500)
            res.send(result)
        })
    }
})

router.post('/ChangeNegocioEstatus',(req,res)=>{
    if(!req.body.params.IdNegocio)  res.sendStatus(400)
    else{
        var query = "UPDATE negocios SET Estatus = " + connection.escape(req.body.params.Estatus)
        + " WHERE IdNegocio = " + connection.escape(req.body.params.IdNegocio)
        connection.query(query,(err,result,fields)=>{
            if(err){
                console.log(err)
                res.sendStatus(500);
            }
            req.app.io.emit('ChangeNegocioEstatus'+req.body.params.Estatus, req.body.params);
            res.send(result)
        })  
    }
})


module.exports = router;