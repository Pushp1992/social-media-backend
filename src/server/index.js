const express = require('express');

require('dotenv').config();

const DBConnection = require('../database');

const app = express();

const hostname = process.env.hostname || 'localhost';

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

// invoke DBConnection

DBConnection;

app.get('/', (req, res) => {
    if(res.statusCode !== 200) {
        throw new Error('Error while routing to /');
    }

    res.send('Successfully routed to root');
});

// import API routes
require('../app/routes')(app);

app.listen(PORT, hostname, () => {
    console.log(`server is listening to http://${hostname}:${PORT}`);
});





