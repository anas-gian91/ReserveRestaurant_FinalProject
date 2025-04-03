const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const main = require('./config/connection');
const router = require('./routes/userRoutes');

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, () => console.log(`Server starts listening on port ${port}`));

