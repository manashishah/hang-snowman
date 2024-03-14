const express = require('express');
const { Client } = require('pg');
const app = express();
require('dotenv').config()


const dbConfig = {
  user: process.env.user,
  password: process.env.password,
  host: process.env.host,
  port: process.env.port,
  database: process.env.database,
};

const client = new Client(dbConfig);

app.get('/', (req, res) => {
  client.connect()
    .then(() => {
      console.log('Connected to PostgreSQL database');

      client.query('SELECT * FROM public.players', (err, result) => {
        if (err) {
          console.error('Error executing query', err);
        } else {
          res.send({ result: result.rows })
          console.log('Query result:', result.rows);
        }


        client.end()
          .then(() => {
            console.log('Connection to PostgreSQL closed');
          })
          .catch((err) => {
            console.error('Error closing connection', err);
          });
      });
    })
    .catch((err) => {
      console.error('Error connecting to PostgreSQL database', err);
    });
})

app.listen(4000, () => {
  console.log(`Server running on http://localhost:4000/`);
});


