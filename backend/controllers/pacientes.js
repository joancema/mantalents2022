const { Paciente } = require('../models');
const { response } = require('express');

const obtenerPacientes = async(req, res = response ) => {

    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, pacientes ] = await Promise.all([
        Paciente.countDocuments(query),
        Paciente.find(query)
            .populate('usuario', 'nombre')
            .populate('citas')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        pacientes
    });
}
const obtenerPaciente = async(req, res = response ) => {

    const { id } = req.params;
    const paciente = await Paciente.findById( id )
                            .populate('usuario', 'nombre')
                            .populate('citas')
    res.json( paciente );

}
const crearPaciente = async(req, res = response ) => {

    const { estado, usuario, ...body } = req.body;
    const pacienteDB = await Paciente.findOne({ rut: body.rut });
    if ( pacienteDB ) {
        return res.status(400).json({
            msg: `El paciente ${ pacienteDB.rut }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        rut: body.rut,
        usuario: req.usuario._id
    }

    const { _id, ...ndata } =  data;

    console.log(ndata)

    const paciente = new Paciente(ndata );

    // Guardar DB
    const nuevoPaciente = await paciente.save();
    await nuevoPaciente
        .populate('usuario', 'nombre')
        .execPopulate();
    res.status(201).json( nuevoPaciente );
}
const actualizarPaciente = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;


    data.usuario = req.usuario._id;

    const paciente = await Paciente.findByIdAndUpdate(id, data, { new: true });

    await paciente
        .populate('usuario', 'nombre')
        .execPopulate();
        
    res.json( paciente );

}
const borrarPaciente = async(req, res = response ) => {

    const { id } = req.params;
    const pacienteBorrado = await Paciente.findByIdAndUpdate( id, { estado: false }, {new: true });
    res.json( pacienteBorrado );
}



module.exports = {
    obtenerPacientes,
    obtenerPaciente,
    crearPaciente,
    actualizarPaciente,
    borrarPaciente
}