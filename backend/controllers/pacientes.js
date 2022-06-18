const fs = require('fs');

const { Paciente, Usuario } = require('../models');
const { response } = require('express');
const {  generarReporte } = require('../helpers/reportes');
const path = require('path');

const obtenerPacientes = async(req, res = response ) => {

    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, pacientes ] = await Promise.all([
        Paciente.countDocuments(query),
        Paciente.find(query)
            .populate('usuario', 'nombre')
            .populate({path:'citas', populate:{path:'usuario', select:'nombre'}})
            //.populate('citas.usuario')
            //.skip( Number( desde ) )
            //.limit(Number( limite ))
    ]);

    res.json({
        total,
        pacientes
    });
}
const obtenerPacienteCita = async(req,res= response) =>{
    const {id} = req.params;
    let resultado = await Paciente.find().populate({path:"citas"}).populate('usuario', 'nombre') ;
    let filtrado = resultado.filter(p=>{return p.citas.filter(c=> {return c._id==id} ).length>0   })[0]
    let citax= filtrado.citas.filter(c=>{return c._id==id})
    
    let listaUsuarios = await Usuario.find();
    let parametroUsuario= citax[0].usuario;
    let filtroUsuario= listaUsuarios.filter(p=>{ return String(p._id) == String(parametroUsuario) })
    


    filtrado.citas= citax;
    filtrado.estadocivil=filtroUsuario[0].nombre;
    filtrado.email=filtroUsuario[0].correo;

    //console.log(filtrado);
    //console.log(filtroUsuario[0])
    let out = await generarReporte(filtrado);

    const enlace= path.join(__dirname,'../',"/uploads",'/consultas/',`${id}.pdf`);
    // console.log(enlace)
    await  out.stream.pipe(fs.createWriteStream(enlace) );

    
    res.json(filtrado);
} 
const obtenerPaciente = async(req, res = response ) => {

    const { id } = req.params;
    const paciente = await Paciente.findById( id )
                            .populate('usuario', 'nombre')
                            .populate({path:'citas', populate:{path:'usuario', select:'nombre'}})
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
    obtenerPacienteCita,
    crearPaciente,
    actualizarPaciente,
    borrarPaciente
}