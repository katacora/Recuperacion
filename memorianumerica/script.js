const numberDisplay = document.getElementById('number-display');
const userInput = document.getElementById('user-input');
const startBtn = document.getElementById('start-btn');
const checkBtn = document.getElementById('check-btn');
const retryBtn = document.getElementById('retry-btn');
const victoriesDisplay = document.getElementById('victories');

let currentNumber;
let userSequence = '';
let victories = 0;
let timer;

function generateNumber() {
    currentNumber = '';
    for (let i = 0; i < victories + 1; i++) {
        currentNumber += Math.floor(Math.random() * 10);
    }
    numberDisplay.textContent = currentNumber;
    userInput.disabled = true; // Deshabilitar la entrada de texto
}

function startGame() {
    userSequence = '';
    generateNumber();
    timer = setTimeout(() => {
        clearNumber();
        userInput.disabled = false; // Habilitar la entrada de texto
    }, 2000); // El número se muestra durante 2 segundos
}

function clearNumber() {
    numberDisplay.textContent = '';
}

function checkInput() {
    const userInputValue = userInput.value;
    if (userInputValue === currentNumber) {
        userSequence += userInputValue;
        userInput.value = '';
        if (userSequence.length === currentNumber.length) {
            victories++;
            victoriesDisplay.textContent = 'Victorias: ' + victories;
            if (victories < 20) {
                startGame();
            } else {
                alert('¡Felicidades! Has completado el juego.');
            }
        } else {
            generateNumber();
            timer = setTimeout(() => {
                clearNumber();
                userInput.disabled = false; // Habilitar la entrada de texto
            }, 2000); // El número se muestra durante 2 segundos
        }
    } else {
        alert('¡Has fallado!');
        victories = 0;
        victoriesDisplay.textContent = 'Victorias: ' + victories;
        userInput.value = '';
        startGame();
    }
}

function retryGame() {
    victories = 0;
    victoriesDisplay.textContent = 'Victorias: ' + victories;
    userInput.value = '';
    startGame();
}

startBtn.addEventListener('click', startGame);
checkBtn.addEventListener('click', checkInput);
retryBtn.addEventListener('click', retryGame);

userInput.addEventListener('keydown', function(event) {
    if (numberDisplay.textContent !== '') {
        event.preventDefault(); // Bloquear la entrada de texto mientras se muestra el número
    }
});
