const express = require('express');
const cors = require("cors");

require('dotenv').config();

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use(
    cors({
        origin: "*",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

// app.use(cookieParser());

app.use('/api', require('./src/router'));

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});