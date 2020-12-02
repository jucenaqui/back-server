const bcrypt = require('bcryptjs');
const { generarJWT} = require('../helpers/jwt');

const User = require('../models/user');

const login = async (req, res) => {

    const { email, password } = req.body;
    console.log(email)
    try {
        
        // valida email
        const userDB = await User.findOne({ email });
        if ( !userDB ) {
            return res.status(404).json({
                msg: 'Email o el password incorrectos'
            });
        }

        // verificar contraseña
        const validPassword = bcrypt.compareSync( password, userDB.password);

        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Email o el password incorrectos, asdf',
            });
        }

        // generar el token jwt
        const token = await generarJWT( userDB.id );

        return res.status(200).json({
            token
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    login
}