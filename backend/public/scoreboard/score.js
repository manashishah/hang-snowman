function fetchPlayerScores() {
    const apiUrl = 'http://129.153.61.220/api/getScores';
  
    // Fetch player scores from the API
    fetch(apiUrl)
      .then(response => {
        if (response.ok) {
          return response.json(); // Parse response body as JSON
        } else {
          throw new Error('Failed to fetch player scores');
        }
      })
      .then(data => {
        // Extract player names and scores from the response data
        const playerNames = data.map(player => player.player_name);
        const playerScores = data.map(player => player.score);
  
        // Update the HTML to display player names
        const playerNamesList = document.getElementById('playerNames');
        playerNamesList.innerHTML = ''; // Clear previous content
        playerNames.forEach(name => {
          const li = document.createElement('li');
          li.textContent = name;
          playerNamesList.appendChild(li);
        });
  
        // Update the HTML to display player scores
        const playerScoresList = document.getElementById('playerScoresList');
        playerScoresList.innerHTML = ''; // Clear previous content
        playerScores.forEach(score => {
          const li = document.createElement('li');
          li.textContent = score;
          playerScoresList.appendChild(li);
        });
      })
      .catch(error => {
        console.error('Error fetching player scores:', error);
      });
  }
  
  // Call the function to fetch and display player scores
  fetchPlayerScores();
  