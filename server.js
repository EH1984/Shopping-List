const express = require('express');
const mongoose = require('mongoose');

const items = require('./routes/api/items');
const config = require('config');

const app = express();

// Json Middleware
app.use(express.json());

// DB config
const db = config.get('mongoURI');

// Connect To DB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err.message));

// Use Routes
app.use('/api/items', items);
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
