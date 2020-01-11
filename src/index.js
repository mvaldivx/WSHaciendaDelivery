var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
require('./connection.js');

//Routers
var routerPrincipal = require('./Controllers/ControllerPrincipal/ControllerPrincipal.js');
var routerAuth = require('./Controllers/ControllerAuth/ControllerAuth.js');
var routerPedidos = require('./Controllers/ControllerPedidos/ControllerPedidos.js');
var routerPedidosAdmin = require('./Controllers/ControllerPedidosAdmin/ControllerPedidosAdmin.js');
var routerCalificaciones = require('./Controllers/ControllerCalificaciones/ControllerCalificaciones.js');
var routerDirecciones = require('./Controllers/ControllerDirecciones/ControllerDirecciones.js');
var routerAnuncios = require('./Controllers/ControllerAnuncios/ControllerAnuncios.js');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "http://localhost:8100","*", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use('/Principal',routerPrincipal);
app.use('/Auth',routerAuth);
app.use('/Pedidos',routerPedidos);
app.use('/PedidosAdmin',routerPedidosAdmin);
app.use('/Calificaciones',routerCalificaciones);
app.use('/Direcciones',routerDirecciones);
app.use('/Anuncios',routerAnuncios);

app.io = io;
  
io.on('connection',()=>{
  console.log('user is connected');
})


var server = http.listen(3000, ()=>{
    console.log('server is running on port', server.address().port);
  });