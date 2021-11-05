const { Schema, model } = require('mongoose');

const MovimientoSchema = Schema({
    codigo:{
        type:String,
        required: [true, "El código es obligatorio"],
        unique: true
    },
    claveAcceso:{
        type: String,
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    subtotal: {
        type: Number,
        default: 0
    },
    iva: {
        type: Number,
        default: 0
    },
    descuento: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    },
    productos: [
        {
            item: {
                type: Schema.Types.ObjectId,
                ref: 'Producto',
                required: true
            },
            cantidad:{
                type: Number,
                required:true,
            },
            precio:{
                type:Number,
                required:true,
            },
            total:{
                type:Number,
            }
        }
    ],
    img: { type: String },
});


MovimientoSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Movimiento', MovimientoSchema );
