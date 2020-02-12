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
var routerCategoriasAdmin = require('./Controllers/ControllerCategoriasAdmin/ControllerCategoriasAdmin.js');
var routerNegocios = require('./Controllers/ControllerNegocios/ControllerNegocios.js');

var validateApiKey = require('./Auth/Authentication.module.js');

function Authentication(req){
  if((req.complete) &&(!validateApiKey(req.headers.authorization))){
    return false
  } else{
    return true
  }
  
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "http://localhost:8100","*", "http://localhost:4200","http://localhost"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers","*");
    res.header("Access-Control-Allow-Headers", "Authorization, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Access-Control-Request-Method, Connection, Host, Referer, Origin, X-Requested-With, Content-Type, Accept, X-DevTools-Emulate-Network-Conditions-Client-Id, User-Agent");
    if(Authentication(req))
      next();
    else
      res.sendStatus(401)
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
app.use('/CategoriasAdmin',routerCategoriasAdmin);
app.use('/Negocios',routerNegocios);

app.io = io;
  
io.on('connection',()=>{
  console.log('user is connected');
})


var server = http.listen(3030, ()=>{
    console.log('server is running on port', server.address().port);
  });