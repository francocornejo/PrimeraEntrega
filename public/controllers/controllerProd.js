const Productos = require('../../productos')
const isNumber = require('is-number');
const prodNuevo = new Productos()

//Funciones de Productos
const getProduct = async (req, res) => {
    if(req.params.id){
        const param = Number(req.params.id)
        const itemId = await prodNuevo.productos.find(item => item.id === param)
        res.json(itemId)
    }else{
        const totalProduct = prodNuevo.productos;
        res.json(totalProduct)
    }
}

const postProduct = async (req, res) => {
    const {timestamp, nombre, descripcion, codigo, foto, price, stock } = req.body
    const elemento = await prodNuevo.agregar(timestamp, nombre, descripcion, codigo, foto, price, stock)
    res.json(elemento)
}

const borrarProd = async (req, res) => {
    const param = req.params.id
    
    if(!isNumber(param)|| !param){
        return res.json(
            { error: "El parámetro no es un número o el id no existe" }
        )
    }
    await prodNuevo.deleteById(param)
    res.json(await prodNuevo.getAll())
} 

const modificarProd = (req, res) => {
    const param = Number(req.params.id);
    const itemId = prodNuevo.productos.find(item => item.id === param)

    if(isNaN(param)){
        res.status(400).json('Error, el id debe ser un numero')
    }else{
        const { timestamp, nombre, description, codigo, foto, price, stock } = req.body
        prodNuevo.productos.forEach( prod => {
            if(prod.id == param){
                prod.timestamp = timestamp
                prod.nombre = nombre
                prod.description = description
                prod.codigo = codigo
                prod.foto = foto
                prod.price = price
                prod.stock = stock
            }
        })
        res.sendStatus(201).json(producto)
    }
}

module.exports = {
    getProduct,
    postProduct,
    borrarProd,
    modificarProd,
    prodNuevo
}