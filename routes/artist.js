const express = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../midlewares/validar-jwt');

// controllers
const { getArtists, 
        saveArtist,
        updateArtist, 
        deleteArtist,
        getArtist } = require('../controllers/artist');
const { validarCampos } = require('../midlewares/validar-campos');

const router = express.Router();

/// /api/user/

router.get('/' ,validarJWT, getArtists);
router.get('/:id' ,validarJWT,getArtist);
router.post('/',
 [ 
     validarJWT,
     check('name', 'El campo name es obligatorio').not().isEmpty(),
     validarCampos,
 ], 
 saveArtist 
 );
router.put('/:id', 
    [
        validarJWT,
        check('name', 'El campo name es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    updateArtist
 );
router.delete('/:id',validarJWT, deleteArtist);

module.exports = router;