const mongoose= require('mongoose')
const {Schema, model} = mongoose;

const CitapreviaSchema= new Schema({
    desde:{type:Date, required:true},
    hasta:{type:Date, required:true},
    motivo: {type:String, required:false},
    paciente:{
        type: Schema.Types.ObjectId,
        ref:'Paciente',
        required:true,
        autopopulate:true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
        autopopulate: true
    },
})


module.exports = model('Citaprevia', CitapreviaSchema);