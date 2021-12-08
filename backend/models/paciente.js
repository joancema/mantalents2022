const mongoose= require('mongoose')
const {Schema, model} = mongoose;


const PacienteSchema= new Schema({
    rut: {type:String, required:true},
    nombre: {type:String, required:true},
    direccion: {type:String, required:true},
    telefono: {type:String, required:true},
    fechanacimiento:{type:Date, required:true},
    alergia:{type:String,  required:false },
    sexo: {type:String, required:true},
    email:{type:String, required:true},
    nacionalidad:{type:String, required:false},
    previsionsalud:{type:String, required:false},
    otrosdatos:{type:String, required:false},
    estado:{type:Boolean, required:true, default: true},
    estadocivil:{type:String, required:false},
    img:{type:String},
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    citas: [
        { 
            type: Schema.Types.ObjectId,
            ref: "Cita",
            required: false,
            autopopulate: true
          }
      ]
})

PacienteSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}

module.exports = model('Paciente', PacienteSchema);