const mongoose= require('mongoose');
mongoose.connect('mongodb+srv://jacobo:joter123456789@gestor-tareas.dmbff.mongodb.net/gestor_tareas?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(db=>console.log(`Database connected.`))
.catch(error=>console.error(error));

