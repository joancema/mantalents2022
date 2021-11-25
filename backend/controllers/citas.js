const { Cita, Paciente } = require('../models');
const { response } = require('express');

const obtenerCitas = async(req, res = response ) => {

    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, citas ] = await Promise.all([
        Cita.countDocuments(query),
        Cita.find(query)
            .populate('usuario', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        citas
    });
}
const obtenerCita = async(req, res = response ) => {

    const { id } = req.params;
    const cita = await Cita.findById( id )
                            .populate('usuario', 'nombre')
    res.json( cita );

}
const crearCita = async(req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...body } = req.body;

    console.log('creando')
    
    const data = {
        ...body,
        usuario: req.usuario._id
    }

    const { _id, ...ndata } =  data;
    
    
    const cita = new Cita(ndata );
    
    const nuevoCita = await cita.save();

    const pacienteActual = await  Paciente.findById(id);
    pacienteActual.citas.push(nuevoCita);
    await Paciente.findByIdAndUpdate(id, { citas: pacienteActual.citas });

    await nuevoCita
        .populate('usuario', 'nombre')
        .execPopulate();
    res.status(201).json( nuevoCita );
}
const actualizarCita = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;


    console.log('modificando')


    data.usuario = req.usuario._id;

    const cita = await Cita.findByIdAndUpdate(id, data, { new: true });

    await cita
        .populate('usuario', 'nombre')
        .execPopulate();
        
    res.json( cita );

}
const borrarCita = async(req, res = response ) => {

    const { id } = req.params;
    const citaBorrado = await Cita.findByIdAndUpdate( id, { estado: false }, {new: true });
    res.json( citaBorrado );
}



module.exports = {
    obtenerCitas,
    obtenerCita,
    crearCita,
    actualizarCita,
    borrarCita
}