var connection = require("../../connection.js");
var express = require('express');

const router = express.Router();

router.post('/NewCategory',(req,res)=>{
    if(!req.body.params.Categoria)  res.sendStatus(400)
    else{
        var queryexist = "SELECT * FROM categorias WHERE Categoria = "
        + connection.escape(req.body.params.Categoria)
        connection.query(queryexist,(err,result,fields)=>{
            if(err){
                console.log(err)
                res.sendStatus(500);
            }
            if(result.length >= 1){
                res.send('existe')
            }else{
                var query = "INSERT INTO categorias SET ?"
                connection.query(query,req.body.params,(err,result,fields)=>{
                    if(err){ 
                        console.log(err)
                        res.sendStatus(500);
                    } 
                    res.send(result)
                })
            }
        })
        
    }
})

router.post('/UpdateCategory',(req,res)=>{
    if(!req.body.params.Categoria)  res.sendStatus(400)
    else{
        var query = "UPDATE categorias SET Categoria = "
        + connection.escape(req.body.params.Categoria)
        + " WHERE Id = "
        + connection.escape(req.body.params.Id)
        connection.query(query,(err,result,fields)=>{
            if(err){ 
                console.log(err)
                res.sendStatus(500);
            } 
            res.send(result)
        })
    }
})

router.get('/getCategorias',(req,res)=>{
    var query = "SELECT * FROM categorias"
    connection.query(query,(err,result,fields)=>{
        if(err){
            console.log('getCategorias','ControllerCategoria',err.sqlMessage)
            res.sendStatus(500)
        }
        res.send(result)
    })
})


module.exports = router;