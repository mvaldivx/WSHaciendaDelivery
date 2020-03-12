var express = require('express');

const router = express.Router();

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
var routerNegociosAdmin = require('./Controllers/ControllerNegociosAdmin/ControllerNegociosAdmin');
var routerAnunciosAdmin = require('./Controllers/ControllerAnunciosAdmin/ControllerAnunciosAdmin');


router.use('/Principal',routerPrincipal);
router.use('/Auth',routerAuth);
router.use('/Pedidos',routerPedidos);
router.use('/PedidosAdmin',routerPedidosAdmin);
router.use('/Calificaciones',routerCalificaciones);
router.use('/Direcciones',routerDirecciones);
router.use('/Anuncios',routerAnuncios);
router.use('/CategoriasAdmin',routerCategoriasAdmin);
router.use('/Negocios',routerNegocios);
router.use('/AnunciosAdmin', routerAnunciosAdmin);
router.use('/NegociosAdmin', routerNegociosAdmin);

module.exports = router;