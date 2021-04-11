const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const sequelize = require('./config/database').sequelize;
const cors = require('cors');
const fs = require('fs');
const https = require('https');

//setup https
const key = fs.readFileSync('./certificates/key.pem', 'utf8');
const cert = fs.readFileSync('./certificates/certificate.crt', 'utf8');
var credentials = {key, cert};
const server = https.createServer(credentials, app);

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//Enable cors for local development and testing, disable this for deployment
app.use(cors());
app.get('/', (req, res) => res.send("Hello Swish"));
app.use('/api/users', jsonParser, require('./routes/users'));
app.use('/api/contacts', jsonParser, require('./routes/contacts'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, console.log(`Server started on port ${PORT}`));

sequelize.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch((err) => console.error('Unable to connect to the database:', err));
