const mongoose= require('mongoose')
const {Schema, model} = mongoose;



const CitaSchema= new Schema({
    estatura: {type:String, required:false},
    peso: {type:String, required:false},
    temperatura: {type:String, required:false},
    presionalterial:{type:String, required:false},
    imc:{type:String, required:false},
    pulso:{type:String, required:false},
    hemo:{type:String, required:false},
    fecha:{type:Date, required:true},
    anamnesis:{type:String, required:true},
    diagnostico:{type:String, required:true},
    tratamiento:{type:String, required:true},
    medicamento:{type:String, required:true},
    fechaproximaatencion:{type:Date, required:false},
    img:{type:String, required:false},
    estado:{type:Boolean, required:true, default:true},
    motivo:{type:String, required:false},
    saturacion:{type:String, required:false},
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
        autopopulate: true
    },
})
CitaSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}


module.exports = model('Cita', CitaSchema);