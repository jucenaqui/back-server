/// /api/album/

const express = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../midlewares/validar-jwt');
const { validarCampos } = require('../midlewares/validar-campos');

const { getAlbums, saveAlbum } = require('../controllers/album');

const router = express.Router();

router.get('/', validarJWT,getAlbums);
router.post('/',[
    validarJWT,
    check('title', 'El name es obligatorio').not().isEmpty(),
    check('artist', 'El artist Id debe ser un id valido').isMongoId(),
    validarCampos
], saveAlbum);


module.exports = router;