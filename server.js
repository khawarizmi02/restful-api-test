const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World');
});

mongoose.connect(process.env.MONGODB_CONNECT);
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('MongoDB connected'));

app.use(express.json());

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
