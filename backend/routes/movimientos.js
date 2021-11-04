const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { 
        obtenerUltimoCodigo,
        crearMovimiento,
        obtenerMovimientos,
        obtenerMovimiento,
        facturaElectronica,
        actualizarMovimiento, 
        borrarMovimiento } = require('../controllers/movimientos');

//const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categorias
 */

//  Obtener todas las categorias - publico
router.get('/', obtenerMovimientos );


router.get('/ultimo/', [], obtenerUltimoCodigo);

// Obtener una categoria por id - publico
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    //check('id').custom( existeProductoPorId ),
    validarCampos,
], obtenerMovimiento );

router.get('/electronica/:id',[ check('id','No es un id de Mongo válido').isMongoId() ],facturaElectronica);

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [ 
    validarJWT,
    check('codigo','El código es obligatorio').not().isEmpty(),
    //check('categoria','No es un id de Mongo').isMongoId(),
    //check('categoria').custom( existeCategoriaPorId ),
    validarCampos
], crearMovimiento );

// Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    check('cliente','No es un id de Mongo').isMongoId(),
    //check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarMovimiento );

// Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    //check('id').custom( existeProductoPorId ),
    validarCampos,
], borrarMovimiento);


module.exports = router;