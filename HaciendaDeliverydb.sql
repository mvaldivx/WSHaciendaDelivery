-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.12-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para haciendadeliveryapp
CREATE DATABASE IF NOT EXISTS `haciendadeliveryapp` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `haciendadeliveryapp`;

-- Volcando estructura para tabla haciendadeliveryapp.categorias
CREATE TABLE IF NOT EXISTS `categorias` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Categoria` varchar(50) NOT NULL DEFAULT '0',
  `img` varchar(500) NOT NULL DEFAULT '0',
  KEY `Id` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COMMENT='categorias a mostrar en el panel principal de aplicacion movil';

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla haciendadeliveryapp.detallepedido
CREATE TABLE IF NOT EXISTS `detallepedido` (
  `IdPedido` int(11) NOT NULL,
  `IdNegocio` int(11) NOT NULL,
  `IdProducto` int(11) NOT NULL,
  `Precio` float NOT NULL,
  `ComentsAdi` varchar(200) NOT NULL,
  `Cantidad` float NOT NULL,
  KEY `IdNeg` (`IdNegocio`),
  KEY `IdProduc` (`IdProducto`),
  KEY `idPed` (`IdPedido`),
  CONSTRAINT `IdNeg` FOREIGN KEY (`IdNegocio`) REFERENCES `negocios` (`IdNegocio`),
  CONSTRAINT `IdProduc` FOREIGN KEY (`IdProducto`) REFERENCES `productos` (`IdProducto`),
  CONSTRAINT `idPed` FOREIGN KEY (`IdPedido`) REFERENCES `pedidos` (`IdPedido`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='detallado de pedido';

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla haciendadeliveryapp.direcciones
CREATE TABLE IF NOT EXISTS `direcciones` (
  `IdDireccion` int(11) NOT NULL AUTO_INCREMENT,
  `IdUsuario` int(11) NOT NULL DEFAULT 0,
  `Calle` varchar(250) NOT NULL DEFAULT '0',
  `Latitud` double NOT NULL DEFAULT 0,
  `Longitud` double NOT NULL DEFAULT 0,
  `Numero` varchar(20) NOT NULL DEFAULT '0',
  `selected` int(11) NOT NULL DEFAULT 0,
  KEY `IdDireccion` (`IdDireccion`),
  KEY `IdUsu` (`IdUsuario`),
  CONSTRAINT `IdUsu` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`IdUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COMMENT='direcciones de clientes al hacer sus pedidos';

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla haciendadeliveryapp.hcambiosnegocios
CREATE TABLE IF NOT EXISTS `hcambiosnegocios` (
  `IdNegocio` int(11) DEFAULT NULL,
  `Campo` varchar(50) DEFAULT NULL,
  `ValorAnt` varchar(200) DEFAULT NULL,
  `Fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `Usuario` varchar(50) NOT NULL DEFAULT 'current_timestamp()',
  KEY `FKHistCambiosNeg` (`IdNegocio`),
  CONSTRAINT `FKHistCambiosNeg` FOREIGN KEY (`IdNegocio`) REFERENCES `negocios` (`IdNegocio`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='historico de cambios en negocios';

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla haciendadeliveryapp.negocios
CREATE TABLE IF NOT EXISTS `negocios` (
  `IdNegocio` int(11) NOT NULL AUTO_INCREMENT,
  `IdCategoria` int(11) DEFAULT 0,
  `Descripcion` varchar(500) NOT NULL DEFAULT '0',
  `Estatus` int(11) NOT NULL DEFAULT 0,
  `Negocio` varchar(100) NOT NULL DEFAULT '0',
  `Abierto` int(11) NOT NULL DEFAULT 0,
  KEY `IdNegocio` (`IdNegocio`),
  KEY `IdCategoria` (`IdCategoria`),
  CONSTRAINT `IdCategoria` FOREIGN KEY (`IdCategoria`) REFERENCES `categorias` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COMMENT='Negocios a mostrar en app movil';

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla haciendadeliveryapp.pedidos
CREATE TABLE IF NOT EXISTS `pedidos` (
  `IdPedido` int(11) NOT NULL AUTO_INCREMENT,
  `IdUsuario` int(11) NOT NULL DEFAULT 0,
  `Calle` varchar(200) NOT NULL DEFAULT '',
  `Estatus` varchar(50) NOT NULL DEFAULT '',
  `Numero` varchar(20) NOT NULL DEFAULT '0',
  `FechaConcluido` datetime NOT NULL,
  `FechaPedido` datetime NOT NULL,
  `Total` double NOT NULL DEFAULT 0,
  `lat` double NOT NULL DEFAULT 0,
  `lng` double NOT NULL DEFAULT 0,
  KEY `IdPedido` (`IdPedido`),
  KEY `IdUsuario` (`IdUsuario`),
  CONSTRAINT `IdUsuario` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`IdUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COMMENT='pedidos realizados desde app movil';

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla haciendadeliveryapp.playerid
CREATE TABLE IF NOT EXISTS `playerid` (
  `IdUsuario` int(11) NOT NULL DEFAULT 0,
  `playerId` varchar(100) NOT NULL DEFAULT '0',
  KEY `IdUs` (`IdUsuario`),
  CONSTRAINT `IdUs` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`IdUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='player id registrado por telefono en OneSignal';

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla haciendadeliveryapp.productos
CREATE TABLE IF NOT EXISTS `productos` (
  `IdProducto` int(11) NOT NULL AUTO_INCREMENT,
  `IdNegocio` int(11) NOT NULL,
  `Precio` double NOT NULL,
  `Producto` varchar(150) NOT NULL,
  `Descripcion` varchar(1000) NOT NULL,
  `Estatus` int(11) NOT NULL,
  `FechaRegistro` datetime NOT NULL DEFAULT current_timestamp(),
  KEY `IdProducto` (`IdProducto`),
  KEY `IdNegoc` (`IdNegocio`),
  CONSTRAINT `IdNegoc` FOREIGN KEY (`IdNegocio`) REFERENCES `negocios` (`IdNegocio`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COMMENT='tabla de productos a mostrar app movil';

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla haciendadeliveryapp.productosenrevision
CREATE TABLE IF NOT EXISTS `productosenrevision` (
  `IdProductoRevision` int(11) NOT NULL AUTO_INCREMENT,
  `IdUsuario` int(11) DEFAULT NULL,
  `Negocio` varchar(100) DEFAULT NULL,
  `Categoria` varchar(100) DEFAULT NULL,
  `Precio` float DEFAULT NULL,
  `Producto` varchar(100) DEFAULT NULL,
  `Descripcion` varchar(200) DEFAULT NULL,
  `Estatus` int(11) DEFAULT NULL,
  `Comentarios` varchar(100) DEFAULT NULL,
  `FechaRegistro` datetime NOT NULL DEFAULT current_timestamp(),
  KEY `FKIdUsuarioprodenrev` (`IdUsuario`),
  KEY `IdProductoRevision` (`IdProductoRevision`),
  CONSTRAINT `FKIdUsuarioprodenrev` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`IdUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla haciendadeliveryapp.resenias
CREATE TABLE IF NOT EXISTS `resenias` (
  `IdResenia` int(11) NOT NULL AUTO_INCREMENT,
  `IdNegocio` int(11) NOT NULL DEFAULT 0,
  `IdUsuario` int(11) NOT NULL DEFAULT 0,
  `IdPedido` int(11) NOT NULL DEFAULT 0,
  `Calificacion` float NOT NULL DEFAULT 0,
  `Comentario` varchar(500) NOT NULL DEFAULT '0',
  `Fecha` datetime NOT NULL,
  KEY `IdResenia` (`IdResenia`),
  KEY `IdNego` (`IdNegocio`),
  KEY `IdUsua` (`IdUsuario`),
  KEY `IdPedido` (`IdPedido`),
  CONSTRAINT `IdNego` FOREIGN KEY (`IdNegocio`) REFERENCES `negocios` (`IdNegocio`),
  CONSTRAINT `IdPedido` FOREIGN KEY (`IdPedido`) REFERENCES `pedidos` (`IdPedido`),
  CONSTRAINT `IdUsua` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`IdUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1 COMMENT='reseñas de compras por usuarios';

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla haciendadeliveryapp.usuarionegocio
CREATE TABLE IF NOT EXISTS `usuarionegocio` (
  `IdUsuario` int(11) DEFAULT NULL,
  `IdNegocio` int(11) DEFAULT NULL,
  KEY `FKIdUsuario` (`IdUsuario`),
  KEY `FKIdNegocio` (`IdNegocio`),
  CONSTRAINT `FKIdNegocio` FOREIGN KEY (`IdNegocio`) REFERENCES `negocios` (`IdNegocio`),
  CONSTRAINT `FKIdUsuario` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`IdUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabla de relacion entre usuarios dueños de negocios';

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla haciendadeliveryapp.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `IdUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `UID` varchar(500) NOT NULL DEFAULT '0',
  `Nombre` varchar(100) NOT NULL DEFAULT '0',
  `FechaNacimiento` datetime NOT NULL,
  `registradoEl` datetime NOT NULL,
  `telefono` varchar(50) NOT NULL DEFAULT '0',
  KEY `IdUsuario` (`IdUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COMMENT='tabla de usuarios';

-- La exportación de datos fue deseleccionada.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
