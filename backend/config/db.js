const mongoose= require('mongoose');
mongoose.connect('mongodb://127.0.0.1/gestor_tareas',{
    useNewUrlParser:true
}).then(db=>console.log(`Database connected.`))
.catch(error=>console.error(error));

