const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearPersona,
        obtenerPersonas,
        obtenerPersona,
        actualizarPersona, 
        borrarPersona } = require('../controllers/personas');

const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categorias
 */

//  Obtener todas las categorias - publico
router.get('/', obtenerPersonas );

// Obtener una categoria por id - publico
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos,
], obtenerPersona );

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearPersona );

// Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
     check('id','No es un id de Mongo').isMongoId(),
    validarCampos
], actualizarPersona );

// Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos,
], borrarPersona);


module.exports = router;