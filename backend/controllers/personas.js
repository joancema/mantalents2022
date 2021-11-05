const { response } = require('express');
const { Persona } = require('../models');


const obtenerPersonas = async(req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, personas ] = await Promise.all([
        Persona.countDocuments(query),
        Persona.find(query)
            .populate('usuario', 'nombre')
            .skip( Number( desde ) )
            //.limit(Number( limite ))
    ]);

    res.json({
        total,
        personas
    });
}

const obtenerPersona = async(req, res = response ) => {

    const { id } = req.params;
    const persona = await Persona.findById( id )
                            .populate('usuario', 'nombre')

    res.json( persona );

}

const crearPersona = async(req, res = response ) => {

    const {   identificacion, nombre, direccion, telefono, correoelectronico } = req.body;

    const personaDB = await Persona.findOne({ nombre: nombre });

    
    if ( personaDB ) {
        return res.status(400).json({
            msg: `La persona ${ personaDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        identificacion,
        nombre,
        direccion,
        telefono,
        correoelectronico,
        nombre,
        estado:true,
        usuario: req.usuario._id
    }

    const persona = new Persona( data );

    // Guardar DB
    const nuevoPersona = await persona.save();
    await nuevoPersona
        .populate('usuario', 'nombre')
        .execPopulate();

    res.status(201).json( nuevoPersona );

}

const actualizarPersona = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;


    data.usuario = req.usuario._id;

    const persona = await Persona.findByIdAndUpdate(id, data, { new: true });

    await persona
        .populate('usuario', 'nombre')
        .execPopulate();
        
    res.json( persona );

}

const borrarPersona = async(req, res = response ) => {

    const { id } = req.params;
    const personaBorrado = await Persona.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( personaBorrado );
}




module.exports = {
    crearPersona,
    obtenerPersonas,
    obtenerPersona,
    actualizarPersona,
    borrarPersona
}