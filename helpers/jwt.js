const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) => {
    return new Promise((resolve, reject)=>{

        const payload = {
            uid
        };

        try {
            jwt.sign( payload, process.env.JWT_SECRET, {
                expiresIn: '12h'
            }, (err, token) => {
                if (err) {
                    reject('Error al crear token');
                } else {
                    resolve(token);
                }
            });
            
        } catch (err) {
            console.log(err);
            reject('Error al crear token');
        }
    });
};

module.exports = {
    generarJWT
}