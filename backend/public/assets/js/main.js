var keyboard = document.getElementsByClassName('virtual-keyboard'); //To render virtual keyboard in html
var inputs = document.getElementsByClassName('inputs'); //To get all the inputs
var snowman = document.getElementsByClassName('snowman'); //To get the image tag with class snowman
var number = 3; //Number of inputs to render, if word has 6 letters then 6 inputs
var container = document.getElementById("input-container"); //Container that contains set of inputs
var inputIndex = 0; //Index to keep the track of entered letter and filled input
var imageIndex = 0;
var nextWordIndex = 0;
var sampleWord = [];

const imagePaths = [
    './assets/images/stage-1.png',
    './assets/images/stage-2.png',
    './assets/images/stage-3.png',
    './assets/images/stage-4.png',
    './assets/images/stage-5.png',
    './assets/images/stage-6.png',
];

var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {})
myModal.toggle()


async function fetchWords(category, difficulty) {
    try {
        const response = await fetch(`http://132.145.96.62/api/words/${category}/${difficulty}`); //calling api here by fetching data from this url
        const data = await response.json();
        return data.wordsAndHints;
    } catch (error) {
        console.error('Error fetching words:', error);
        return [];
    }
}


async function startGame() {

    var closeButton = document.getElementById("close");
    closeButton.click();

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

    console.log(inputs)
    tempArr = [];
    for (let input of inputs) {
        tempArr.push(input.value);
    }
    console.log(sampleWord.join())
    console.log(tempArr.join())
    if (imageIndex > 5 && (sampleWord.join('') != tempArr.join(''))) {
        setTimeout(() => {
            alert('Game Over!!');
            location.reload();
        }, "1000");
    } else if ((sampleWord.join('') == tempArr.join(''))) {
        setTimeout(() => {
            alert('You Won!! Play Next.');

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