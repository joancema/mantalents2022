const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { 
        obtenerCitas, obtenerCita, crearCita, actualizarCita, borrarCita } = require('../controllers/citas');


const router = Router();


router.get('/', obtenerCitas );



router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos,
], obtenerCita );


router.post('/:id', [ 
    validarJWT,
    check('id','No es un id Monto válido').isMongoId(),
    check('fecha','La fecha es obligatoria').not().isEmpty(),
    validarCampos
], crearCita );

router.put('/:id',[
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos
], actualizarCita );

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos,
], borrarCita);


module.exports = router;