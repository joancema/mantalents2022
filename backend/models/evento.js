const mongoose= require('mongoose')
const {Schema, model} = mongoose;




const EventoSchema= new Schema({
    username: {type:String, required:false},
    motivo: {type:String, required:true},
    informacion: {type:String, required:true},
    fechaempieza:{type:Date, required:true},
    fechatermina:{type:Date, required:true},
    estado:{type:Boolean, required:true},
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    img:{type:String}
})


EventoSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}

module.exports = model('Evento', EventoSchema);