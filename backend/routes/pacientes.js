const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { 
        obtenerPacientes, obtenerPaciente, obtenerPacienteCita, 
        crearPaciente, actualizarPaciente, borrarPaciente } = require('../controllers/pacientes');


const router = Router();


router.get('/', obtenerPacientes );

router.get('/cita/:id', obtenerPacienteCita );

router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos,
], obtenerPaciente );


router.post('/', [ 
    validarJWT,
    check('rut','El rut es obligatorio').not().isEmpty(),
    validarCampos
], crearPaciente );

router.put('/:id',[
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos
], actualizarPaciente );

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos,
], borrarPaciente);


module.exports = router;