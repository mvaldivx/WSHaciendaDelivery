var connection = require("../../connection.js");
var express = require('express');

const router = express.Router();

router.get('/getAnuncios',(req,res)=>{
    var query = "SELECT p.IdProducto AS IdProducto, n.Negocio AS Negocio, p.Precio, Producto,"
    + " p.Descripcion, p.Estatus, p.FechaRegistro, '' AS Comentarios,"
    + " IdCategoria AS Categoria , '0' AS Revision"
    + " FROM productos p"
    + " JOIN negocios n ON p.IdNegocio = n.IdNegocio"
    + " UNION"
    + " SELECT IdProductoRevision AS IdProducto, "
    + " IF(ISNULL(n.Negocio) = 0,n.Negocio, p.Negocio) AS Negocio, Precio,Producto, "
    + " p.Descripcion, p.Estatus, FechaRegistro, Comentarios,"
    + " IF(ISNULL(n.IdCategoria) = 1,p.Categoria, c.Categoria), "
    + "  '1' AS Revision"
    + "  FROM productosenrevision p"
    + "  LEFT JOIN negocios n ON p.Negocio = n.IdNegocio"
    + "  LEFT JOIN categorias c ON c.Id = n.IdCategoria"
    connection.query(query,(err,result,fields)=>{
        if(err){
            console.log('getAnuncios','ControllerAnunciosAdmin',err.sqlMessage)
            res.sendStatus(500)
        }
        res.send(result)
    })
})


module.exports = router;