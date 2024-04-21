require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const carRoutes = require('./routes/car');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors());

app.use('/car', carRoutes);

app.listen(process.env.PORT,()=> console.log(`server running on port:${process.env.PORT}`))