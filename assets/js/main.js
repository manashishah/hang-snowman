var keyboard = document.getElementsByClassName('virtual-keyboard'); //To render virtual keyboard in html
var inputs = document.getElementsByTagName('input'); //To get all the inputs
var snowman = document.getElementsByClassName('snowman'); //To get the image tag with class snowman
var number = 3; //Number of inputs to render, if word has 6 letters then 6 inputs
var container = document.getElementById("input-container"); //Container that contains set of inputs
var inputIndex = 0; //Index to keep the track of entered letter and filled input
var imageIndex = 0;
var nextWordIndex = 0;
var sampleWord = [];

// var nameBox = document.getElementById("nameBox");

// // Add click event listener to the name box
// nameBox.addEventListener("click", function () {
//     // Remove the "Enter your name" text
//     document.getElementById("nameText").textContent = "";
// });


//Different path of images of the snowman, hanging upon failures  
const imagePaths = [
    './assets/images/stage-1.png',
    './assets/images/stage-2.png',
    './assets/images/stage-3.png',
    './assets/images/stage-4.png',
    './assets/images/stage-5.png',
    './assets/images/stage-6.png',
];


// function start(){
//     var ele = document.getElementsByName('gender');

//     for (i = 0; i < ele.length; i++) {
//         if (ele[i].checked)
//             document.getElementById("result").innerHTML
//                 = "Gender: " + ele[i].value;
//     }
// }


// Function to fetch words from the API
async function fetchWords(category, difficulty) {
    try {
        const response = await fetch(`http://localhost:4000/api/words/${category}/${difficulty}`);
        const data = await response.json();
        return data.wordsAndHints;
    } catch (error) {
        console.error('Error fetching words:', error);
        return [];
    }
}

// Call the fetchWords function to fetch words for the game
async function startGame() {

    // var ele = document.getElementsByName('category');


    // var category = document.querySelector('input[name="category"]:checked').value;



    // var level = document.querySelector('input[name="level"]:checked').value;

    // const form = document.forms.start;
    // const checked = form.querySelector('input[name=category]:checked');

    var ele = document.getElementsByName('category');

  
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            var cat = ele[i].id;
       
    }

    var levels = document.getElementsByName('level');

    
    for (i = 0; i < levels.length; i++) {
        if (levels[i].checked)
            var level = levels[i].id;
       
    }



   

    const words = await fetchWords(cat, level);
    console.log(words); // Use the fetched words in your game logic



    sampleWord = [...words[nextWordIndex].word.toLowerCase()];
    document.getElementById('hint').innerHTML = words[nextWordIndex].hint;


    number = sampleWord.length;

    for (i = 0; i < number; i++) {
        var input = document.createElement("input");
        input.type = "text";
        input.classList.add("inputs");
        input.name = "name" + i;
        container.appendChild(input);
        container.appendChild(document.createElement("br"));
    }

    console.log(sampleWord)
}

// Call the startGame function to begin the game
//   startGame();

// const sampleWord = ['T', 'U', 'R', 'K', 'E', 'Y'];


//Code to render inputs dynamically via js
while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
}



//Rendering keyboard, each key has a function which will be called upon clicking

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


//here's the logic of filling the inputs with the key pressed. Also setting snowman hanging images upon wrong guess. Once it's hanged, showing alert "game over" for now
function typeVirtualKeyboardKey(key) {
    // if (inputIndex > 5) {
    //     return;
    // }


    key.innerHTML = key.innerHTML.toLowerCase();

    key.classList.add("disabled");

    let flag = false;
    for (i = 0; i < sampleWord.length; i++) {
        if (key.innerHTML == sampleWord[i]) {
            flag = true;
            inputs[i].value = key.innerHTML;   //Maintaining one index for now to jump to another inputs
        }
    }


    if (!flag) {
        snowman[0].setAttribute('src', imagePaths[imageIndex]); //Same index for assigning paths declared on the top
        imageIndex++;
    }

    inputIndex++;

    tempArr = [];
    for (let input of inputs) {
        tempArr.push(input.value);
    }
    console.log(sampleWord.join(), tempArr.join())
    if (imageIndex > 5 && (sampleWord.join('') != tempArr.join(''))) {
        setTimeout(() => {
            alert('Game Over!!'); //Game is over once it's hanged
            location.reload();
        }, "1000");
    } else if ((sampleWord.join('') == tempArr.join(''))) {
        setTimeout(() => {
            alert('You Won!!');
            // location.reload();

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


