const express = require('express');
const { Client } = require('pg');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config()

app.use(cors());


const client = new Client({
  user: process.env.user,
  password: process.env.password,
  host: process.env.host,
  port: process.env.port,
  database: process.env.database,
});

app.use(express.static('public'));


// Connect to the PostgreSQL database
client.connect();

// Route to fetch words based on category and difficulty
app.get('/api/words/:category/:difficulty', async (req, res) => {
  const { category, difficulty } = req.params;

  try {
    // Query to fetch words and hints based on category and difficulty
    const result = await client.query(
      `SELECT word, hint
      FROM words
      JOIN categories ON words.category_id = categories.category_id
      WHERE lower(category_name) = lower($1) 
      AND difficulty = $2
      LIMIT 5;`,
      [category, difficulty]
    );

    // Extract words and hints from the result
    const wordsAndHints = result.rows.map(row => ({
      word: row.word,
      hint: row.hint
    }));

    // Send response with the words and hints
    res.json({ wordsAndHints });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('*', async(req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main_game.html'));
});

app.listen(4000, () => {
  console.log(`Server running on http://localhost:4000/`);
});


// http://localhost:4000/api/words/country/easy