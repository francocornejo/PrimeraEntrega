const Carrito = require('../../carrito')
const Productos = require('../../productos')
const isNumber = require('is-number')
const { prodNuevo }  = require('./controllerProd')

const cart = new Carrito

const postCarrito = (req, res) => {
    cart.agregarCart()
    res.sendStatus(201)
}

const verCarrito = async (req, res) => {
    const id = Number(req.params.id)
    if(!isNumber(id)){
        return res.json({ error: "El parámetro no es un número" })
    }
    const elemento =  await cart.getCartById(id)
    if(!elemento.length){
        return res.status(404).json({error: "Carrito no encontrado"})
    }
    res.json(elemento)
}

const deleteCarrito = async (req, res) => {
    const id = Number(req.params.id)
    const elemento = await cart.getCartById(id)
    if(!elemento.length){
        return res.status(404).json(
            {error: "Carrito no encontrado"}
        )
    }
    if(!isNumber(id)){
        return res.json(
            { error: "El parámetro no es un número o el id no existe" }
        )
    }
    await cart.deleteCartById(id)
    res.json(await cart.getAllCarts())
}

const deleteProductoCarrito = async (req, res)=>{
    const id = Number(req.params.id)
    const id_prod = Number(req.params.id_prod)
    const productdelete = await prodNuevo.getById(id_prod)
    if(!isNumber(id)){
        return res.json(
            { error: "El parámetro no es un número o el id no existe" }
        )
    }
    if(!isNumber(id_prod) || productdelete.length == 0){
        return res.json(
            { error: "El producto no existe" }
        )
    }
    res.json(await cart.deleteProductofCartById(id, id_prod))  
}

const insertProductoByIdToCart = async (req,res)=>{
    const id_cart = Number(req.params.id)
    const id_prod = Number(req.body.id)
    const elemento =  await cart.getCartById(id_cart)
    if(!elemento.length){
        return res.status(404).json(
            {error: "Carrito no encontrado"}
        )}
    
    const productInsert= prodNuevo.getById(id_prod)
    const item= await productInsert 

    if(!isNumber(id_cart)){
        return res.json(
            { error: "El parámetro no es un número o el id no existe" }
        )}
    if(!isNumber(id_prod)|| productInsert.length == 0){
        return res.json(
            { error: "El producto no existe" }
        )}
    res.json(await cart.insertProductById(id_cart, item))
}


module.exports = {
    postCarrito,
    verCarrito,
    insertProductoByIdToCart,
    deleteCarrito,
    deleteProductoCarrito
}