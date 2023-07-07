const express = require('express')
const router = express.Router()
const fs = require('fs') // fs permite manejo de archivos

// __dirname es una variable de entorno que dice la direccion absoluta del directorio del archivo en donde esta (en este caso estamos en index.js)
const pathRouter = `${__dirname}` 

const removeExtension = (fileName) => {
    return fileName.split('.').shift()
}

fs.readdirSync(pathRouter).filter((file) => { // este metodo obtiene el nombre de los archivos del directorio y por cada crea una ruta
    const fileWithOutExt = removeExtension(file);
    const skip = ['index'].includes(fileWithOutExt)
    if (!skip) {
        router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`)) 
        console.log('CARGAR RUTA ---->', fileWithOutExt)
    }
})

router.get('*', (req, res) => {
    res.status(404)
    res.send({ error: 'Not found' })
})

module.exports = router