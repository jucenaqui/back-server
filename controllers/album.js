const Album = require('../models/album');

const getAlbums = async (req, res)=>{

    try {
        const albums = await Album.find();
        res.status(200).json({
            albums
        });
        
    } catch (err) {
        console.log(err);
        res.status(404).json({
            msg: 'contacte al administrador'
        });
    }
};

const saveAlbum = async (req, res) => {

    try {

        const album = new Album({
            user: req.uid,
            ...req.body
        })

        const albumSaved = await album.save();
        res.json({
            albumSaved
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contacte con el administrador'
        });
    }

};

module.exports = {
    getAlbums,
    saveAlbum,
}