// api/login
const express = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../midlewares/validar-campos');
const router = express.Router();

router.post('/',
  [
    check('email', 'Email es un campo obligatorio').isEmail(),
    check('password', 'La contraseña es un campo obligatorio').not().isEmpty(),
    validarCampos,
  ],
  login
);


module.exports = router;