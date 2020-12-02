const express = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../midlewares/validar-jwt');

// controllers
const { getUsers, 
        saveUser,
        updateUser, 
        deleteUser,
        getUser } = require('../controllers/user');
const { validarCampos } = require('../midlewares/validar-campos');

const router = express.Router();

/// /api/user/

router.get('/', validarJWT , getUsers);
router.get('/:id', validarJWT ,getUser);
router.post('/',
 [ 
     check('name', 'El campo name es obligatorio').not().isEmpty(),
     check('lastName', 'El campo lastName es obligatorio').not().isEmpty(),
     check('password', 'El campo password es obligatorio').not().isEmpty(),
     check('email', 'El campo email es obligatorio').isEmail(),
     validarCampos,
 ], 
 saveUser 
 );
router.put('/:id', 
    [
        validarJWT,
        check('name', 'El campo name es obligatorio').not().isEmpty(),
        check('lastName', 'El campo lastName es obligatorio').not().isEmpty(),
        check('role', 'El campo role es obligatorio').not().isEmpty(),
        check('email', 'El campo email es obligatorio').isEmail(),
        validarCampos,
    ],
    updateUser
 );
router.delete('/:id', validarJWT, deleteUser);

module.exports = router;
