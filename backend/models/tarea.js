const { Schema, model } = require('mongoose');
const tarea_Schema = Schema({
    nombre_tarea: {
        type: String, required: true
    },
    prioridad: {
        type: Number, enum: [1, 2, 3], default: 3
    },
    fecha_vencimiento: {
        type: Date, required: true
    },
    user: {
        type: Schema.ObjectId, ref: "usuarios"
    },
    created_since: {
        type: Date, default: Date.now
    }
});

module.exports = model('tareas', tarea_Schema);