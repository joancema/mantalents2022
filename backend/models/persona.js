const { Schema, model } = require('mongoose');

const PersonaSchema = Schema({
    identificacion: {
         type: String,
        required: true 
        },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    direccion:{
        type:String,
    },
    telefono:{
        type:String,
    },
    correoelectronico:{
        type:String,
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    img: { type: String },
});


PersonaSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Persona', PersonaSchema );
