const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {

    try {
        const users = await User.find();

        return res.status(200)
        .json({
            users,
        });
    } catch (error) {
        console.log(error);
        return res.status(400)
        .json({
            msg: 'error al consultar los usuarios.'
        });  
    }
};

const getUser = async (req, res) => {

    const uid = req.params.id;
    try {
        // validar si existe user
        const user = await User.findById(uid);

        if ( !user ) {
            return res.status(404).json({
                msg: 'No existe usuario con ese id'
            });
        }

        return res.status(200)
        .json({
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(400)
        .json({
            msg: 'error al consultar el usuario.'
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

const updateUser = async (req, res) => {

    const uid = req.params.id;
    try {

        // validar que el usuario existe
        const usuarioDB = await User.findById( uid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                msg: 'No existe un usuario con ese id'
            });
        }

        const { password, image, ...campos } = req.body;
        const userUpdated = await User.findByIdAndUpdate( uid, campos, { new: true} );

        return res.status(200).json({
            msg: 'usuario actualizado',
            userUpdated
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Contacta con el administrador'
        });
    }
};

const deleteUser = async (req, res = response ) => {

    const uid = req.params.id;
    try {

        // validar que el usuario existe
        const usuarioDB = await User.findById( uid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                msg: 'No existe un usuario con ese id'
            });
        }

        await User.findByIdAndDelete( uid );

        return res.status(200).json({
            msg: 'Usuario eliminado'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Conctata al administrador'
        });
    }
};

module.exports = {
    getUsers,
    getUser,
    saveUser,
    updateUser,
    deleteUser
};