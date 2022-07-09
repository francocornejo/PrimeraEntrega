const {leer, escribir} = require ('./public/mockData/oData')

class Productos {
    constructor(){
        this.productos = []
    }

    async agregar(nombre, descripcion, codigo, foto, timestamp, price, stock){
        if(this.productos.length == 0){
            const elemento = {
                nombre,
                price,
                foto,
                descripcion, 
                codigo,
                timestamp: Date.now(), 
                stock,
                id:1
            }
            this.productos.push(elemento)
            await escribir('dataProductos', this.productos)
            return elemento
        }else{
           const lastIndex = this.productos[this.productos.length-1].id
           const Index= lastIndex + 1
           const elemento = {
                nombre,
                price,
                foto,
                descripcion, 
                codigo,
                timestamp: Date.now(), 
                stock,
                id:Index
            }
            this.productos.push(elemento)
            await escribir('dataProductos', this.productos)
            return elemento
        }
    }

    async getById(id){
        this.productos = await leer('dataProductos')
        const elemento = this.productos.filter(producto => producto.id === id)
        return elemento   
    }

    async getAll(){
        this.productos = await leer('dataProductos')
        return this.productos
    }

    async deleteById(id){
        this.productos = await leer('dataProductos')
        const objeto = this.productos.filter(item => item.id != id)
        this.productos = objeto 
        await escribir('dataProductos', this.productos) 
    }
}
module.exports = Productos