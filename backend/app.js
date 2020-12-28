const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const db = async () => {
  try {
   await mongoose.connect('mongodb://tall:passer@cluster0-shard-00-00.qfmxu.mongodb.net:27017,cluster0-shard-00-01.qfmxu.mongodb.net:27017,cluster0-shard-00-02.qfmxu.mongodb.net:27017/go_full_stack?ssl=true&replicaSet=atlas-ows3ry-shard-0&authSource=admin&retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false // To Suppress deprecated warning messages
   });
   console.log('DB connected');
  } catch (error) {
   console.log(`Connection Error : ${error}`);
  }
};

 // Execute DB connections
db();

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/stuff',stuffRoutes);
app.use('/api/auth',userRoutes);

module.exports = app;