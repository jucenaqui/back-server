const User = require('../models/user');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {

    try {
        const users = await User.find();

        return res.status(200)
        .json({
            users
        });
    } catch (error) {
        console.log(error);
        return res.status(400)
        .json({
            msg: 'error al consultar los usuarios.'
        });  
    }
};

const saveUser = async (req, res) => {
        const body = req.body;
        const user = new User(body);
        user.role =  'USER_ROLE';
        user.image = '';

        try {

            // validate email
            const emailExist = await User.findOne({ email: body.email});
            if ( emailExist ) {
                return res.status(400).json({
                    msg: 'El correo ya esta registrado'
                });
            }

            // encript password
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync( body.password, salt);

            // save user
            const userSaved =  await user.save();
            res.json({
                user: userSaved
            });
        } catch (error) {
            console.log(error)
            res.status(400).json({
                msg: 'error al guardar el usuario'
            }); 
        }
};

module.exports = {
    getUsers,
    saveUser
}