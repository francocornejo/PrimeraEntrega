const fs = require('fs')
const path = require('path')


const escribir = async (filename,item)=>{
    try{
        await fs.promises.writeFile(path.join(__dirname,`/${filename}`), JSON.stringify(item,null,'\t'))
    }catch(err){
        console.log('no se pudo guardar el producto', err)
    }

}
const leer = async (filename)=>{
    try{
        const data= await fs.promises.readFile(path.join(__dirname,`/${filename}`), 'utf-8')
        const contenido= JSON.parse(data)
        return contenido
        
    }catch(err){
        console.log('no se pudo leer el producto', err)
        return contenido=[]
    }
}


module.exports = {escribir,leer}