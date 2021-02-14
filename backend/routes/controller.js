const usuarios=require('../models/usuario');
module.exports={
    login:async(req, res)=>{
        try{
            const {correo, contrasena}=req.body;
            const usuario=await usuarios.find({correo:correo, contrasena:contrasena},function(err, info){
                if(err){
                    console.log(err);
                }else{
                    res.json(info);
                }
            });
        }catch(e){res.json({message:"Error inesperado", error:e})}
    }
}