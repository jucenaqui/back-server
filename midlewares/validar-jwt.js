const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next ) => {

    //leer token
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
        
    } catch (err) {
        console.log(err)
        return res.status(401).json({
            msg: 'Token no valido'
        });
    }
};

module.exports = {
    validarJWT
};

