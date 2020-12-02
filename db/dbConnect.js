const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect( process.env.CONNECTION_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('db conexion exitosa');
    } catch (error) {
        console.log(error);
        throw new Error('error al iniciar la base de datos');
    }
};

module.exports = {
    dbConnection
}