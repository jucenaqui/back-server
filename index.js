const express = require('express');
const { dbConnection } =  require('./db/dbConnect');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// routes
const routeUser = require('./routes/user');
const routeAuth = require('./routes/auth');

const app = express();

// configurar cors
app.use(cors());
app.use(bodyParser.json());
// base de datos
dbConnection();

/// use routes
app.use('/api/user', routeUser);
app.use('/api/login', routeAuth);

app.listen(process.env.PORT, () => {
    console.log('el servidor esta escuchando en http://localhost:' + process.env.PORT);
});

