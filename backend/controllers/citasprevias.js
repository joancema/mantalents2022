const { response } = require('express');
const { Citaprevia } = require('../models');


const obtenerCitasprevias = async(req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, citasprevias ] = await Promise.all([
        Citaprevia.countDocuments(query),
        Citaprevia.find(query)
            .populate('usuario', 'nombre')
            .populate('paciente', 'nombre')
            .skip( Number( desde ) )
            //.limit(Number( limite ))
    ]);

    res.json({
        total,
        citasprevias
    });
}

const obtenerCitaprevia = async(req, res = response ) => {

    const { id } = req.params;
    const citaprevia = await Citaprevia.findById( id )
                            .populate('usuario', 'nombre')
                            .populate('paciente', 'nombre');

    res.json( citaprevia );

}

const crearCitaprevia = async(req, res = response ) => {

    const { estado, usuario, ...body } = req.body;

    
    const data = {
        ...body,
        motivo: body.motivo,
        usuario: req.usuario._id
    }
    const { _id, ...ndata } =  data;

    const citaprevia = new Citaprevia(ndata);

    // Guardar DB
    const nuevaCitaprevia = await citaprevia.save();
    await nuevaCitaprevia
        .populate('usuario', 'nombre')
        .populate('paciente', 'nombre')
        .execPopulate();

    res.status(201).json( nuevaCitaprevia );

}

const actualizarCitaprevia = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;


    data.usuario = req.usuario._id;

    const citaprevia = await Citaprevia.findByIdAndUpdate(id, data, { new: true });

    await citaprevia
        .populate('usuario', 'nombre')
        .populate('paciente', 'nombre')
        .execPopulate();
        
    res.json( citaprevia );

}

const borrarCitaprevia = async(req, res = response ) => {

    const { id } = req.params;
    const citapreviaBorrada = await Citaprevia.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( citapreviaBorrada );
}




module.exports = {
    crearCitaprevia,
    obtenerCitaprevia,
    obtenerCitasprevias,
    actualizarCitaprevia,
    borrarCitaprevia
}