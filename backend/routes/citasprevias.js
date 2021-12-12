const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearCitaprevia, actualizarCitaprevia, borrarCitaprevia, obtenerCitaprevia, obtenerCitasprevias } = require('../controllers/citasprevias');

const router = Router();

/**
 * {{url}}/api/categorias
 */

//  Obtener todas las categorias - publico
router.get('/', obtenerCitasprevias );

// Obtener una categoria por id - publico
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos,
], obtenerCitaprevia );

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [ 
    validarJWT,
    check('motivo','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCitaprevia );

router.put('/:id',[
    validarJWT,
    check('motivo','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],actualizarCitaprevia );

router.delete('/:id',[
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos,
],borrarCitaprevia);



module.exports = router;