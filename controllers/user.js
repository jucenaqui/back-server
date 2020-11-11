const { User } = require('../models/user');

const getUsers = (req, res) => {

    User.find((err, users) => {
        if (!err) {
            return res.status(200)
            .json({
                users
            });
        } else {
            return res.status(400)
            .json({
                msg: 'error al consultar los usuarios.'
            });
        }
    });
    
}

module.exports = {
    getUsers,
}