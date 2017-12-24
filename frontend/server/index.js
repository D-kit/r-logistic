// @flow

const express = require('express');
const path = require('path');

const app = express();
const TARGETS_PATH = '../target/';
const PORT = 8082;
const IP_ADRESS = 'localhost';

app.set('port', PORT);
app.set('ipAdress', IP_ADRESS);

app.use(express.static(path.join(__dirname, TARGETS_PATH)));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, TARGETS_PATH, 'index.html')));

/* eslint-disable no-console */
app.listen(
    PORT,
    IP_ADRESS,
    () => console.log(`
    ==============================================
    -> Server 🏃 (running) on ${IP_ADRESS}:${PORT}
    ==============================================
  `)
);
/* eslint-enable no-console */
