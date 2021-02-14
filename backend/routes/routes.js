const {Router}=require('express');
const router=Router();
const usuarios=require('../models/usuario');

router.get('/', async(req, res)=>{
    const usuario=await usuarios.find().sort('_id');
    res.json(usuario);
});


module.exports=router;