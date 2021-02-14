const usuarios = require('../models/usuario');
module.exports = {
    login: async (req, res) => {
        try {
            const { correo, contrasena } = req.body;
            const usuario = await usuarios.find({ correo: correo, contrasena: contrasena }, function (err, info) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(info);
                }
            });
        } catch (e) { res.json({ message: "Error inesperado", error: e }) }
    },
    register: async (req, res) => {
        try{
            const { nombre, apellidos, correo, contrasena } = req.body;
            const usuario = await new usuarios({ nombre, apellidos, correo, contrasena});
            usuario.save();
            res.json({message:"Usuario registrado"});
        }catch(e){ res.json({ message: "Error inesperado", error: e })}
    }
}