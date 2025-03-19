const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const routes = require('./routes');
const auth = require('./auth');

const app = express();
const port = 3000;

// Serve static files from the src directory
app.use(express.static(path.join(__dirname, '../src')));

app.use(bodyParser.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

app.use('/api', routes);
app.use('/auth', auth);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});