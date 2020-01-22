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

router.get('/getCategorias',(req,res)=>{
    var query = "SELECT * FROM categorias"
    connection.query(query,(err,result,fields)=>{
        if(err){
            console.log('getCategorias','ControllerAnuncios',err.sqlMessage)
            res.sendStatus(500)
        }
        res.send(result)
    })
})

router.post('/NuevoAnuncio',(req,res)=>{
    if(!req.body.params.Producto)  res.sendStatus(400)
    else{
        var param = req.body.params
        //Valida si ya tiene registrado el mismo producto
            var buscaExistentes = "SELECT SUM(registros) as registros FROM ( "
            + " SELECT COUNT(n.IdNegocio) as registros FROM negocios n join productos p on n.IdNegocio = n.IdNegocio"
            + " WHERE n.IdNegocio = " + connection.escape(param.Negocio)
            + " AND p.Producto = " + connection.escape(param.Producto)
            + " UNION "
            + " SELECT COUNT(Negocio) as registros FROM productosenrevision where Negocio = "
            + connection.escape(param.Negocio) + " AND Producto = "
            + connection.escape(param.Producto)
            + " ) suma"
            connection.query(buscaExistentes,(err,result,fields)=>{
                if(err){
                    console.log('ControllerAnuncios','insertaNuevoAnuncio',param,err.sqlMessage)
                    res.sendStatus(500)
                }
                if(result[0].registros > 0){
                    res.send({success:false,message:'Ya tienes un anuncio igual registrado.'});
                }else{
                    var query = "INSERT INTO productosenrevision SET ?"
                    connection.query(query,param,(err,result,fields)=>{
                        if(err){ 
                            console.log('ControllerAnuncios','insertaNuevoAnuncio',info,err.sqlMessage)
                            res.sendStatus(500)
                        } 
                        res.send({success:true,message:'Registrado correctamente.'})
                    })
                }
            })
    }
    
})

function insertaNuevoAnuncio(info){
    var query = "INSERT INTO productosenrevision SET ?"
    connection.query(query,info,(err,result,fields)=>{
        if(err){ 
            console.log('ControllerAnuncios','insertaNuevoAnuncio',info,err.sqlMessage)
            return false
        } 
        return true
    })
}


router.get('/getAnunciosNegocio',(req,res)=>{
    if(!req.query.Negocio)  res.sendStatus(400)
    else{
        var query = "SELECT IdProducto, IdNegocio, Precio,"
        + " Producto, Descripcion, Estatus,"
        + " 0 As enRevision "
        + " FROM Productos Where IdNegocio = " + connection.escape(req.query.Negocio)
        + " UNION"
        + " SELECT IdProductoRevision AS Idproducto,"
        + " Negocio As IdNegocio,"
        + " Precio,Producto,Descripcion,Estatus,"
        + " 1 as EnRevision"
        + "  FROM productosenrevision"
        + "  Where Negocio = " + connection.escape(req.query.Negocio)
        connection.query(query,(err,result,fields)=>{
            if(err){
                console.log('getAnunciosNegocio','ControllerAnuncios', req.query.Negocio,err.sqlMessage)
                res.sendStatus(500)
            }
            res.send(result)
        })
    }
})

module.exports = router;