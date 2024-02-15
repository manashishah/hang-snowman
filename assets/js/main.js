var keyboard = document.getElementsByClassName('virtual-keyboard'); //To render virtual keyboard in html
var inputs = document.getElementsByTagName('input'); //To get all the inputs
var snowman = document.getElementsByClassName('snowman'); //To get the image tag with class snowman
var number = 6; //Number of inputs to render, if word has 6 letters then 6 inputs
var container = document.getElementById("input-container"); //Container that contains set of inputs
var inputIndex = 0; //Index to keep the track of entered letter and filled input

//Different path of images of the snowman, hanging upon failures  
const imagePaths = [
    './assets/images/stage-1.png',
    './assets/images/stage-2.png',
    './assets/images/stage-3.png',
    './assets/images/stage-4.png',
    './assets/images/stage-5.png',
    './assets/images/stage-6.png',
];

//Code to render inputs dynamically via js
while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
}

for (i = 0; i < number; i++) {
    var input = document.createElement("input");
    input.type = "text";
    input.name = "name" + i;
    container.appendChild(input);
    container.appendChild(document.createElement("br"));
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
    key.classList.add("disabled");
    inputs[inputIndex].value = key.innerHTML;   //Maintaining one index for now to jump to another inputs
    snowman[0].setAttribute('src', imagePaths[inputIndex]); //Same index for assigning paths declared on the top
    inputIndex++;
    if (inputIndex > 5) {
        setTimeout(() => {
            alert('Game Over!!'); //Game is over once it's hanged
        }, "1000");

    }
}


