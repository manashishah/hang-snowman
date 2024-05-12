const express = require('express');
const { Client } = require('pg');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config()

app.use(cors());

app.use(express.json());


const client = new Client({
  user: process.env.user,
  password: process.env.password,
  host: process.env.host,
  port: process.env.port,
  database: process.env.database,
});

app.use(express.static('public'));



client.connect();


app.get('/api/words/:category/:difficulty', async (req, res) => {
  const { category, difficulty } = req.params;

  try {

    const result = await client.query(
      `SELECT word, hint
      FROM words
      JOIN categories ON words.category_id = categories.category_id
      WHERE lower(category_name) = lower($1) 
      AND difficulty = $2
      LIMIT 5;`,
      [category, difficulty]
    );


    const wordsAndHints = result.rows.map(row => ({
      word: row.word,
      hint: row.hint
    }));


    res.json({ wordsAndHints });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/addScore', async (req, res) => {
  const { playerName, score } = req.body;

  try {
    const existingPlayer = await client.query(
      `SELECT * FROM players WHERE player_name = $1`,
      [playerName]
    );

    if (existingPlayer.rows.length === 0) {

      const result = await client.query(
        `INSERT INTO players (player_name, score) VALUES ($1, $2) RETURNING *`,
        [playerName, score]
      );


      res.json({ success: true, player: result.rows[0] });
    } else {

      const currentScore = existingPlayer.rows[0].score;
      if (score > currentScore) {
        const result = await client.query(
          `UPDATE players SET score = $1 WHERE player_name = $2 RETURNING *`,
          [score, playerName]
        );


        res.json({ success: true, player: result.rows[0] });
      } else {

        res.json({ success: true, message: 'Score not updated as it is not higher than the current score' });
      }
    }
  } catch (error) {
    console.error('Error inserting player score:', error);
    res.status(500).json({ success: false, error: 'Failed to add player score' });
  }
});


app.get('/api/getScores', async (req, res) => {
  try {

    const result = await client.query(
      `SELECT * FROM players`
    );


    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching player scores:', error);
    res.status(500).json({ error: 'Failed to fetch player scores' });
  }
});

app.get('*', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'landingpage.html'));
});

app.listen(4000, () => {
  console.log(`Server running on http://localhost:4000/`);
});


// http://localhost:4000/api/words/country/easy