const express = require('express');
const { dbConnection } =  require('./db/dbConnect');
const cors = require('cors');
const bodyParser = require('body-parser');

// routes
const routeUser = require('./routes/user');

const app = express();

// configurar cors
app.use(cors());
app.use(bodyParser.json());
// base de datos
dbConnection();

/// use routes
app.use('/api/user', routeUser);

app.listen(3000, () => {
    console.log('el servidor esta escuchando en http://localhost:' + 3000);
});

