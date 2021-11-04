const { Movimiento } = require('../models');
const fs = require('fs');
const path = require('path');

const { response } = require('express');
const dropboxV2Api = require('dropbox-v2-api');

const { generar, generarReporte } = require('../helpers/electronica');


const obtenerUltimoCodigo= async(req,res=response)=>{
    const movimiento= await Movimiento.findOne({}).sort({codigo:-1}).limit(1);
    res.json(movimiento);
}

const obtenerMovimientos = async(req, res = response ) => {

    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, movimientos ] = await Promise.all([
        Movimiento.countDocuments(query),
        Movimiento.find(query)
            .populate('usuario', 'nombre')
            .populate('cliente')
            .populate('productos.item')
            .skip( Number( desde ) )
            //.limit(Number( limite ))
    ]);

    res.json({
        total,
        movimientos
    });
}

const obtenerMovimiento = async(req, res = response ) => {

    const { id } = req.params;
    const movimiento = await Movimiento.findById( id )
                            .populate('usuario', 'nombre').populate('cliente')
                            .populate('productos.item')
                            //.populate('categoria', 'nombre');

    res.json( movimiento );

}

const facturaElectronica =  async(req,res=response)=>{
    const {id} = req.params;
    let movimiento =  await Movimiento.findById(id)
                            .populate('usuario','nombre')
                            .populate('cliente')
                            .populate('productos.item');

    let respuesta=  await generar(movimiento);

    movimiento.claveAcceso = respuesta.claveAcceso;


    const movimientoActualizado = await Movimiento.findByIdAndUpdate(id, { claveAcceso: respuesta.claveAcceso }, { new: true });

    movimiento.productos.forEach(p=>{
        p.total=p.cantidad*p.precio;
    })


    let out = await generarReporte(movimiento);



    const enlace= path.join(__dirname,'../',"/uploads",'/facturas/',`${respuesta.claveAcceso}.pdf`);
    await  out.stream.pipe(fs.createWriteStream(enlace) );

    const dropbox = dropboxV2Api.authenticate({
        token: 'FJx5cgQhN7cAAAAAAAAAAZP9ymy8Hi3xOeOO27KVxlyAAfehAVtjJF9Y9HU1aXzV'
    });

    dropbox({
        resource: 'files/upload',
        parameters: {
            path: `/facturas/${respuesta.claveAcceso}.pdf`
        },
        readStream: fs.createReadStream(enlace)
    }, (err, result, response) => {
        console.log(`completó todo`)
        if (err)
        {
            console.log(err)
        }
    });


    //out.stream.pipe(res);
    res.json(respuesta.respuesta);
}

const crearMovimiento = async(req, res = response ) => {

    const { estado, usuario, ...body } = req.body;

    const movimientoDB = await Movimiento.findOne({ codigo: body.codigo });

    
    if ( movimientoDB ) {
        return res.status(400).json({
            msg: `El movimiento ${ movimientoDB.codigo }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        codigo: body.codigo,
        usuario: req.usuario._id
    }

    const movimiento = new Movimiento( data );

    // Guardar DB
    const nuevoMovimiento = await movimiento.save();
    await nuevoMovimiento
        .populate('usuario', 'nombre')
        //.populate('categoria', 'nombre')
        .execPopulate();

    res.status(201).json( nuevoMovimiento );

}

const actualizarMovimiento = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;


    data.usuario = req.usuario._id;

    const movimiento = await Movimiento.findByIdAndUpdate(id, data, { new: true });

    await movimiento
        .populate('usuario', 'nombre')
        //.populate('categoria', 'nombre')
        .execPopulate();
        
    res.json( movimiento );

}

const borrarMovimiento = async(req, res = response ) => {

    const { id } = req.params;
    const movimientoBorrado = await Movimiento.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( movimientoBorrado );
}




module.exports = {
    obtenerUltimoCodigo,
    crearMovimiento,
    obtenerMovimientos,
    obtenerMovimiento,
    facturaElectronica,
    actualizarMovimiento,
    borrarMovimiento
}