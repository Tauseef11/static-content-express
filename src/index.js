const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const PORT = process.env.PORT || 3000;

const { getPage, getBlog, getBase } = require('./controllers/index');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', getBase);

app.get('/:page', getPage);

app.get('/blog/:month/:topic', getBlog);

app.use('/', router);

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});

module.exports = app;
