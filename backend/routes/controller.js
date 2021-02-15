const nodemailer = require('nodemailer');
const Usuarios = require('../models/usuario');
const smtpTransport = require('nodemailer-smtp-transport');
const tareas = require('../models/tarea');

let transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'jacobogarcesoquendo@gmail.com',
        pass: 'joter1234567'
    }}
));

module.exports = {
    updateTasks:async(req, res)=>{
        const {id_tarea}=req.params;
        const tarea=await tareas.findByIdAndUpdate(id_tarea,{$set:req.body}, (err, resultado)=>{
            if(err){
                console.log(err);
            }else{
                res.json({message:'Tarea actualizada'});
            }
        });
    },
    getTasks:async(req, res)=>{
        try {
            const {user}=req.body;
            const tarea=await tareas.find({user:user}).sort({prioridad:1});
            res.json(tarea);
        } catch (e) { res.json({ message: "Error inesperado", error: e }) }
       
    },
    registerTask:async (req, res)=>{
        try {
            const { nombre_tarea, prioridad, fecha_vencimiento, user } = req.body;
            const tarea = await new tareas({ nombre_tarea, prioridad, fecha_vencimiento, user});
            tarea.save();
            res.json({ message: "Tarea registrada" });
        } catch (e) { res.json({ message: "Error inesperado", error: e }) }
    },
    login: async (req, res) => {
        try {
            const { correo, contrasena } = req.body;
            const usuario = await Usuarios.find({ correo: correo, contrasena: contrasena }, function (err, info) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(info);
                }
            });
        } catch (e) { res.json({ message: "Error inesperado", error: e }) }
    },
    register: async (req, res) => {
        try {
            const { nombre, apellidos, correo, contrasena } = req.body;
            const usuario = await new Usuarios({ nombre, apellidos, correo, contrasena });
            usuario.save();
            res.json({ message: "Usuario registrado" });
        } catch (e) { res.json({ message: "Error inesperado", error: e }) }
    },
    sendEmail: async (req, res) => {
        try {
            const { nombre, correo, contrasena } = req.body;
            let contentHtml = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset='utf-8'>
                    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
                    <title>Page Title</title>
                    <meta name='viewport' content='width=device-width, initial-scale=1'>
                    <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
                    <script src='main.js'></script>
                </head>
                <body>
                <div id=":13b" class="a3s aiL msg3112354034380291461"><u></u>   
                <div style="background-color:#f8f8f8">
                    <div style="background-color:#f8f8f8">
                    <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%"><tbody><tr><td style="direction:ltr;font-size:0px;padding:0px;text-align:center;vertical-align:top"><div class="m_3112354034380291461dys-column-per-100" style="direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%">
                        <tbody><tr><td align="center" style="font-size:0px;padding:0px;word-break:break-word"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px"><tbody><tr><td style="width:600px"><img alt="" height="auto" src="https://i2.wp.com/www.organizartemagazine.com/wp-content/uploads/2020/02/to-do-list-como-hacerla-scaled.jpg?fit=1024%2C683&ssl=1" style="border:none;display:block;font-size:13px;height:auto;outline:none;text-decoration:none;width:100%" title="" width="600" class="CToWUd a6T" tabindex="0"><div class="a6S" dir="ltr" style="opacity: 0.01; left: 658.333px; top: 510.667px;"><div id=":1zk" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" role="button" tabindex="0" aria-label="Descargar el archivo adjunto " data-tooltip-class="a1V" data-tooltip="Descargar"><div class="akn"><div class="aSK J-J5-Ji aYr"></div></div></div></div></td></tr></tbody></table></td></tr>
                        </tbody></table></div></td></tr></tbody></table></div>
                    <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top"><div class="m_3112354034380291461dys-column-per-100" style="direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%">
                        <tbody><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word"><h2 style="color:#444444;font-family:Nunito Sans,Arial,sans-serif;font-size:32px;font-weight:600;line-height:46px;margin:0;padding:0;text-align:center">Bienvenido a Progressive Tasks</h2></td></tr>
                        </tbody></table></div></td></tr></tbody></table></div>
                    <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top"><div class="m_3112354034380291461dys-column-per-100" style="direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%">
                        <tbody><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word"><div style="color:#555555;font-family:Nunito Sans,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;text-align:center"> ${nombre}, te acabas de registrar en Progressive Tasks con las siguientes credenciales <br><br> Correo: ${correo}<br> Contraseña: ${contrasena} </div></td></tr>
                        </tbody></table></div></td></tr></tbody></table></div>
                    <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%"><tbody><tr><td style="direction:ltr;font-size:0px;padding:0px;text-align:center;vertical-align:top"><div class="m_3112354034380291461dys-column-per-100" style="direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tbody><tr><td style="padding:0px;vertical-align:top"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                        <tbody><tr><td align="center" style="font-size:0px;padding:0px;word-break:break-word"><div style="color:#555555;font-family:Nunito Sans,Arial,sans-serif;font-size:16px;font-weight:400;line-height:26px;text-align:center">
                            <a class="m_3112354034380291461gray-link" href="#m_3112354034380291461_" style="color:#555555">My Account</a>
                            <span style="padding:0px 5px">|</span> 
                            <a class="m_3112354034380291461gray-link" href="#m_3112354034380291461_" style="color:#555555">Contact Us</a>
                            <span style="padding:0px 5px">|</span>
                            <a class="m_3112354034380291461gray-link" href="#m_3112354034380291461_" style="color:#555555">Privacy Policy</a>
                        </div></td></tr>
                        </tbody></table></td></tr></tbody></table></div></td></tr></tbody></table></div>
                    <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;padding-top:10px;text-align:center;vertical-align:top"><div class="m_3112354034380291461dys-column-per-100" style="direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top" width="100%">
                        <tbody><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word"><div style="color:#787878;font-family:Nunito Sans,Arial,sans-serif;font-size:12px;font-weight:400;line-height:20px;text-align:center">©Derechos Reservados Progressive Tasks 2021</div></td></tr>
                        </tbody></table></div></td></tr></tbody></table></div>
                    </div>
                    </div></div><div class="adL"> 
                    </div>
                </div>
                </body>
            </html>`;
            const mailOptions = {
                from: 'Progressive Tasks',
                to:correo,
                subject:'Registro en Progressive Tasks',
                html:contentHtml
            } 
            transporter.sendMail(mailOptions,function(error,info){
                if(error){
                    res.status(406).json({state:0, message:error});
                }else{
                    res.json({state:1, message:'Correo enviado'})
                }  
            });
        } catch (e) { res.json({ message: "Error inesperado", error: e }); }
    }
}