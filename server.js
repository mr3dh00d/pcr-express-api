const express = require('express');

require('dotenv').config();

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use('/api', require('./src/router'));

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});