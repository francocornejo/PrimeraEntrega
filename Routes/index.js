const { Router } = require('express')
const router = Router()
const { getProduct, postProduct, borrarProd, modificarProd} = require('../public/controllers/controllerProd')
const { postCarrito, insertProductoByIdToCart, verCarrito, deleteCarrito, deleteProductoCarrito  } = require('../public/controllers/controllerCart')

//Routers de los Productos
router.get( '/api/productos/:id?', getProduct )
router.post( '/api/productos', postProduct )
router.put('/api/productos/:id', modificarProd )
router.delete('/api/productos/:id', borrarProd )

//Routers del Carrito
router.post('/api/carrito', postCarrito )
router.post('/api/carrito/:id/productos', insertProductoByIdToCart )
router.get('/api/carrito/:id/productos', verCarrito )
router.delete('/api/carrito/:id', deleteCarrito )
router.delete('/api/carrito/:id/productos/:id_prod', deleteProductoCarrito )

module.exports = router