const express = require('express');
const cors = require('cors');
require('express-async-errors')
const blogsRouter = require('./controllers/blogs');
const connectToDatabase = require('./utils/mongoose');
const { MONGODB_URI } = require('./utils/config');
const app = express();

connectToDatabase(MONGODB_URI);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>BLOGS APPLICATION!</h1>');
});

app.use('/api/blogs', blogsRouter);

module.exports = app;
