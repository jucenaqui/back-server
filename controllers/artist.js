const { response } = require('express');
const Artist = require('../models/artist');

const getArtists = async (req, res = response) => {

    try {
        const artists = await Artist.find()
                              .populate('user','name email image');

        return res.status(200)
        .json({
            artists,
        });
    } catch (error) {
        console.log(error);
        return res.status(400)
        .json({
            msg: 'error al consultar los artistas.'
        });  
    }
};

const getArtist = async (req, res) => {

    const uid = req.params.id;
    try {
        // validar si existe user
        const artist = await Artist.findById(uid)
                            .populate('user','name email image');

        if ( !artist ) {
            return res.status(404).json({
                msg: 'No existe artista con ese id'
            });
        }

        return res.status(200)
        .json({
            artist
        });
    } catch (error) {
        console.log(error);
        return res.status(400)
        .json({
            msg: 'error al consultar el artista.'
        });  
    }
};

const saveArtist = async (req, res) => {
        const body = req.body;
        const artist = new Artist({
            user: req.uid,
            ...body
        });

        try {

            // validar artist
            const artistExist = await Artist.findOne({ name: body.name});
            if ( artistExist ) {
                return res.status(400).json({
                    msg: 'El Artista ya esta registrado'
                });
            }

            // save artist
            const artistSaved =  await artist.save();
            res.json({
                artist: artistSaved
            });
        } catch (error) {
            console.log(error)
            res.status(400).json({
                msg: 'error al guardar el artista'
            }); 
        }
};

const updateArtist = async (req, res) => {

    const uid = req.params.id;
    try {

        // validar que el artist existe
        const artistDB = await Artist.findById( uid );

        if ( !artistDB ) {
            return res.status(404).json({
                msg: 'No existe un artista con ese id'
            });
        }

        const {name, description,image, } = req.body;
        const campos = {
            user: req.uid,
            name,
            description,
            image
        }

        const artistUpdated = await Artist.findByIdAndUpdate( uid, campos, { new: true} );

        return res.status(200).json({
            msg: 'artista actualizado',
            artistUpdated
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Contacta con el administrador'
        });
    }
};

const deleteArtist = async (req, res = response ) => {

    const uid = req.params.id;
    try {

        // validar que el artist existe
        const artistDB = await Artist.findById( uid );

        if ( !artistDB ) {
            return res.status(404).json({
                msg: 'No existe un artista con ese id'
            });
        }

        await Artist.findByIdAndDelete( uid );

        return res.status(200).json({
            msg: 'artista eliminado'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Contacta al administrador'
        });
    }
};

module.exports = {
    getArtists,
    getArtist,
    saveArtist,
    updateArtist,
    deleteArtist
};