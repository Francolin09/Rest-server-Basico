const mongoose = require('mongoose')//paso 1


const dbConnection = async()=>{ //paso2
    try {
       await mongoose.connect(process.env.MONGODB_ATLAS)
       console.log('Base de datos en linea yaaaay')
        
    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar la base datos, noooo')
    }

}






module.exports={dbConnection}//paso3