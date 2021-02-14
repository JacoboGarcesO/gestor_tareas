const {Schema, model}=require('mongoose');
const usuario_Schema=new Schema({
    nombre:{
        type: String, required:true
    },
    apellidos:{
        type: String, required:true
    },
    correo:{
        type: String, required:true
    },
    contrasena:{
        type: String, required:true
    },
    created_since:{
        type:Date, default:Date.now
    }
});
module.exports= model('usuarios', usuario_Schema);