var connection = require("../../connection.js");
var express = require('express');

const router = express.Router();


router.get('/getMisNegocios',(req,res)=>{
    if(!req.query.IdUsuario)  res.sendStatus(400)
    else{
        var query = "SELECT n.IdNegocio, n.IdCategoria, n.Negocio, n.Estatus, n.Abierto FROM negocios n JOIN "
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
        var query = "UPDATE negocios SET Abierto = " + connection.escape(req.body.params.Estatus)
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
        var negocioExistente = false
        if(isNaN(param.Negocio)){
            var validaNegocioExistente = 'SELECT * FROM negocios where Negocio = ' 
            + connection.escape(param.Negocio)
            connection.query(validaNegocioExistente,(err,result,fields)=>{
                if(result.length > 0) negocioExistente = true
                //inserta nuevo negocio
                else{
                    var insertaNegocio = "INSERT INTO negocios (IdCategoria, Descripcion, Estatus, Negocio, Abierto) "
                    + " VALUES ( " + connection.escape(isNaN(param.Categoria)?null:param.Categoria) + " ,"
                    + connection.escape("") + " , 0,"
                    + connection.escape(param.Negocio) + " , 0)"
                    connection.query(insertaNegocio,(err,result,fields)=>{
                        if(err) console.log( 'registrando negocio', err.sqlMessage)
                        else{
                            var insertanNegocioUsuario = "INSERT INTO usuarionegocio (IdUsuario,IdNegocio) VALUES ( "
                            + connection.escape(param.IdUsuario) + " , "
                            + connection.escape(result.insertId) + ")"
                            connection.query(insertanNegocioUsuario,(err,result2,fields)=>{
                                if(err){
                                    console.log( 'registrando negocio', err.sqlMessage)
                                    res.sendStatus(500)
                                } 
                                else{
                                    var queryinsert = "INSERT INTO productosenrevision (IdUsuario, Negocio,Categoria, Precio "
                                    +   ", Producto, Descripcion, Estatus, Comentarios ) Values ( "
                                    +   connection.escape(param.IdUsuario) + " , "
                                    +   connection.escape(result.insertId) + " , "
                                    +   connection.escape(param.Categoria) + " , "
                                    +   connection.escape(param.Precio) + " , "
                                    +   connection.escape(param.Producto) + " , "
                                    +   connection.escape(param.Descripcion) + " , "
                                    +   connection.escape(0) + " , "
                                    +   connection.escape("") + " ) "
                                    connection.query(queryinsert,(err,result3,fields)=>{
                                        if(err){ 
                                            console.log('ControllerAnuncios','insertaNuevoAnuncio',info,err.sqlMessage)
                                            res.sendStatus(500)
                                        } 
                                        res.send({success:true,message:'Registrado correctamente.', IdNegocio: result.insertId, IdProducto: result3.insertId})
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }else{
            if(negocioExistente){
                res.send({success:false,message:'Ya existe un negocio registrado con el mismo nombre'});
            }else{
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
                    if(result && result[0].registros > 0){
                        res.send({success:false,message:'Ya tienes un anuncio igual registrado.'});
                    }else{
                        var query = "INSERT INTO productosenrevision SET ?"
                        connection.query(query,param,(err,result2,fields)=>{
                            if(err){ 
                                console.log('ControllerAnuncios','insertaNuevoAnuncio',info,err.sqlMessage)
                                res.sendStatus(500)
                            } 
                            res.send({success:true,message:'Registrado correctamente.', IdNegocio: param.Negocio, IdProducto: result2.insertId})
                        })
                    }
                })
            }
        }
    }
})

function insertaNuevoAnuncio(info){
    return true
    /*var query = "INSERT INTO productosenrevision SET ?"
    connection.query(query,info,(err,result,fields)=>{
        if(err){ 
            console.log('ControllerAnuncios','insertaNuevoAnuncio',info,err.sqlMessage)
            return false
        } 
        return true
    })*/
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

router.get('/getInfoAnuncio',(req,res)=>{
    if(!req.query.IdProducto)  res.sendStatus(400)
    else{
        var query = "SELECT IdProducto, IdNegocio, Precio,"
        + " Producto, Descripcion, Estatus,"
        + " 0 As enRevision "
        + " FROM Productos Where IdProducto = " + connection.escape(req.query.IdProducto)
        + " AND IdNegocio = " + connection.escape(req.query.IdNegocio)
        + " UNION"
        + " SELECT IdProductoRevision AS Idproducto,"
        + " Negocio As IdNegocio,"
        + " Precio,Producto,Descripcion,Estatus,"
        + " 1 as EnRevision"
        + "  FROM productosenrevision"
        + "  Where IdProductoRevision = " + connection.escape(req.query.IdProducto)
        + " AND Negocio = " + connection.escape(req.query.IdNegocio)
        connection.query(query,(err,result,fields)=>{
            if(err){
                console.log('getInfoAnuncio ',' ControllerAnuncios ', req.query.Negocio,err.sqlMessage)
                res.sendStatus(500)
            }
            res.send(result)
        })
    }
})

module.exports = router;