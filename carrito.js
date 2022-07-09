const {leer, escribir}= require ('./public/mockData/oData')

class Carrito{
    constructor(){
        this.carrito = []
    }

    async agregarCart(){
        this.carrito = await leer('dataCarrito')
        if(this.carrito.length==0){
            const elemento = {
                timestamp:Date.now(), 
                id:1,
                products:[]
            }
            this.carrito.push(elemento)
            await escribir('dataCarrito',this.carrito)
            return elemento
        }else{
           const lastIndex = this.carrito[this.carrito.length-1].id
           const Index= lastIndex + 1
           const elemento = {
            timestamp:Date.now(),
            id:Index,
            products:[]
            }
            this.carrito.push(elemento)
            await escribir('dataCarrito',this.carrito)
            return elemento
        }
    }

    async getCartById(id){
        this.carrito = await leer('dataCarrito')
        const chango = this.carrito.filter(cart => cart.id === id)
        return chango   
    }

    async getAllCarts(){
        this.carrito = await leer('dataCarrito')
        return this.carrito
    }
    
    async insertProductById(id, productInsert){
        this.carrito = await leer('dataCarrito')
        const index = this.carrito.findIndex(element => element.id == id)
        this.carrito[index].products.push(productInsert)  
        await escribir('dataCarrito', this.carrito)  
    }

    async deleteCartById(id){
        this.carrito = await leer('dataCarrito')
        const objeto = this.carrito.filter(item => item.id != id)
        this.carrito = objeto 
        await escribir('dataCarrito', this.carrito)  
    }

    async deleteProductofCartById(id, id_prod){
        this.carrito = await leer('dataCarrito')

        const index = this.carrito.findIndex(element => element.id == id)
        
        const finalCart = this.carrito[index].products.filter(item => item.id !== id_prod)

        console.log(finalCart)

        this.carrito[index].products = finalCart
        
        await escribir('dataCarrito', this.carrito) 
    }
}

module.exports = Carrito