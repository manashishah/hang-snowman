var keyboard = document.getElementsByClassName('virtual-keyboard'); //To render virtual keyboard in html
var inputs = document.getElementsByClassName('inputs'); //To get all the inputs
var snowman = document.getElementsByClassName('snowman'); //To get the image tag with class snowman
var number = 3; //Number of inputs to render, if word has 6 letters then 6 inputs
var container = document.getElementById("input-container"); //Container that contains set of inputs
var inputIndex = 0; //Index to keep the track of entered letter and filled input
var imageIndex = 0;
var nextWordIndex = 0;
var sampleWord = [];
var player = '';
let countdownInterval;
let timeLeft = 180; // Timer duration in seconds
const countdownDisplay = document.getElementById('countdown');
var fetchedWords = [];
var score = 0;
var level;

const imagePaths = [
    './assets/images/stage-1.png',
    './assets/images/stage-2.png',
    './assets/images/stage-3.png',
    './assets/images/stage-4.png',
    './assets/images/stage-5.png',
    './assets/images/stage-6.png',
];

var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {})
// var nextModal = new bootstrap.Modal(document.getElementById('nextModal'), {})
myModal.toggle()

// fetchPlayerScores();


async function fetchWords(category, difficulty) {
    try {
        const response = await fetch(`http://localhost:4000/api/words/${category}/${difficulty}`);
        const data = await response.json();
        fetchedWords = data.wordsAndHints;
        // console.log(fetchedWords)
        return data.wordsAndHints;
    } catch (error) {
        console.error('Error fetching words:', error);
        return [];
    }
}


async function startGame() {

    player = localStorage.getItem("player");
    console.log(player)





    var ele = document.getElementsByName('category');


    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            var cat = ele[i].id;
    }

    var levels = document.getElementsByName('level');


    for (i = 0; i < levels.length; i++) {
        if (levels[i].checked)
            level = levels[i].id;
    }

    if (!cat || !level) {
        alert('Please Select category and level');
        return;
    }

    var closeButton = document.getElementById("close");
    closeButton.click();

    startTimer();


    const words = await fetchWords(cat, level);

    sampleWord = [...words[nextWordIndex].word.toLowerCase()];
    document.getElementById('hint').innerHTML = words[nextWordIndex].hint;


    number = sampleWord.length;

    for (i = 0; i < number; i++) {
        var input = document.createElement("input");
        input.type = "text";
        input.classList.add("inputs");
        input.name = "name" + i;
        container.appendChild(input);
        // container.appendChild(document.createElement("br"));
    }

    console.log(sampleWord)
}

while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
}

function start() {
    localStorage.clear();
    var player = document.getElementById('nameBox').value;
    localStorage.setItem("player", player);
    window.location.href = "home.html";
    console.log(player)
}

keyboard[0].innerHTML = `
    <div class="letters-row"><span class="key" onmousedown="typeVirtualKeyboardKey(this)">Q</span>
    <span class="key" onmousedown="typeVirtualKeyboardKey(this)">W</span> <span class="key"
        onmousedown="typeVirtualKeyboardKey(this)">E</span> <span class="key"
        onmousedown="typeVirtualKeyboardKey(this)">R</span> <span class="key"
        onmousedown="typeVirtualKeyboardKey(this)">T</span> <span class="key"
        onmousedown="typeVirtualKeyboardKey(this)">Y</span> <span class="key"
        onmousedown="typeVirtualKeyboardKey(this)">U</span> <span class="key"
        onmousedown="typeVirtualKeyboardKey(this)">I</span> <span class="key"
        onmousedown="typeVirtualKeyboardKey(this)">O</span> <span class="key"
        onmousedown="typeVirtualKeyboardKey(this)">P</span> </div>

<div class="letters-row">  <span class="key" onmousedown="typeVirtualKeyboardKey(this)">A</span>
    <span class="key" onmousedown="typeVirtualKeyboardKey(this)">S</span> <span class="key"
        onmousedown="typeVirtualKeyboardKey(this)">D</span> <span class="key"
        onmousedown="typeVirtualKeyboardKey(this)">F</span> <span class="key"
        onmousedown="typeVirtualKeyboardKey(this)">G</span> <span class="key"
        onmousedown="typeVirtualKeyboardKey(this)">H</span> <span class="key"
        onmousedown="typeVirtualKeyboardKey(this)">J</span> <span class="key"
        onmousedown="typeVirtualKeyboardKey(this)">K</span> <span class="key"
        onmousedown="typeVirtualKeyboardKey(this)">L</span>  </div>

<div class="letters-row"> <span class="key"
        onmousedown="typeVirtualKeyboardKey(this)">Z</span> <span class="key"
        onmousedown="typeVirtualKeyboardKey(this)">X</span> <span class="key"
        onmousedown="typeVirtualKeyboardKey(this)">C</span> <span class="key"
        onmousedown="typeVirtualKeyboardKey(this)">V</span> <span class="key"
        onmousedown="typeVirtualKeyboardKey(this)">B</span> <span class="key"
        onmousedown="typeVirtualKeyboardKey(this)">N</span> <span class="key"
        onmousedown="typeVirtualKeyboardKey(this)">M</span> </div>

    `;

function typeVirtualKeyboardKey(key) {

    key.innerHTML = key.innerHTML.toLowerCase();
    key.classList.add("disabled");

    let flag = false;
    for (i = 0; i < sampleWord.length; i++) {
        if (key.innerHTML == sampleWord[i]) {
            flag = true;
            inputs[i].value = key.innerHTML;
        }
    }


    if (!flag) {
        snowman[0].setAttribute('src', imagePaths[imageIndex]);
        imageIndex++;
    }

    inputIndex++;

    // console.log(inputs)
    tempArr = [];
    for (let input of inputs) {
        tempArr.push(input.value);
    }
    console.log(sampleWord.join())
    console.log(tempArr.join())
    if (imageIndex > 5 && (sampleWord.join('') != tempArr.join(''))) {
        gameOver();
    } else if ((sampleWord.join('') == tempArr.join(''))) {
        setTimeout(() => {

            if (nextWordIndex >= fetchedWords.length - 1) {
                let inputsToRemove = document.getElementsByClassName('inputs');

                while (inputsToRemove.length > 0) {
                    inputsToRemove[0].parentNode.removeChild(inputsToRemove[0]);
                }


                let keys = document.getElementsByClassName('key');

                for (let key of keys) {
                    key.classList.remove("disabled");
                }

                fetchedWords = [];
                nextWordIndex = 0;
                myModal.toggle();
                return;
            }
            // alert('You Won!! Play Next.');

            showAlert('You Won!!');

   

            if (level == 'Easy') {
                score += 3;
            }
            if (level == 'Medium') {
                score += 5;
            }
            if (level == 'Easy') {
                score += 7;
            }

            // console.log(score)

            document.getElementById('currentScore').innerHTML = score;

            nextWordIndex++;

            let inputsToRemove = document.getElementsByClassName('inputs');

            while (inputsToRemove.length > 0) {
                inputsToRemove[0].parentNode.removeChild(inputsToRemove[0]);
            }


            let keys = document.getElementsByClassName('key');

            for (let key of keys) {
                key.classList.remove("disabled");
            }



            startGame();
        }, "1000");
    }
}


function startTimer() {
    // Ensure timer is not already running
    if (!countdownInterval) {
        countdownInterval = setInterval(updateTimer, 1000); // Update timer every second
    }
}

function stopTimer() {
    clearInterval(countdownInterval);
    countdownInterval = null;
}

function updateTimer() {
    timeLeft--; // Decrease timeLeft by 1 second
    if (timeLeft < 0) {
        stopTimer(); // Stop timer when time is up
        countdownDisplay.textContent = 'Time\'s up!';
        gameOver();
    } else {
        displayTimeLeft();
    }
}

function displayTimeLeft() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    countdownDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function gameOver() {
    
        // alert('Game Over!!');

        setScore()
            .then(() => {
                console.log('Player score added successfully');
            })
            .catch(error => {
                console.error('Failed to add player score:', error);
            });
          
            

    
   
}




function setScore() {
    const data = {
        playerName: player,
        score: score
    };

  
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    
    return fetch('http://localhost:4000/api/addScore', options)
        .then(response => {
           
            if (response.ok) {
                return response.json(); 
            } else {
                throw new Error('Failed to add player score');
            }
        })
        .then(data => {
            console.log('Player data added successfully:', data);
            var gameOver = new bootstrap.Modal(document.getElementById('gameOver'), {})
            gameOver.toggle();
            return data; 
        })
        .catch(error => {
            console.error('Error adding player score:', error);
            throw error;
        });
}


function showAlert(message) {
    var alertModal = new bootstrap.Modal(document.getElementById('customAlert'), {
      backdrop: 'static', 
      keyboard: false 
    });

   
    document.getElementById('customAlertBody').innerHTML = message;

   
     alertModal.show();
  }


 
  document.querySelector('#customAlert button[data-bs-dismiss="modal"]').addEventListener('click', function() {
    alertModal.hide();
  });
