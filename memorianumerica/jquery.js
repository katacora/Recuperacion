$(document).ready(function() {
    const numberDisplay = $('#number-display');
    const userInput = $('#user-input');
    const startBtn = $('#start-btn');
    const checkBtn = $('#check-btn');
    const retryBtn = $('#retry-btn');
    const victoriesDisplay = $('#victories');
    const errorDisplay = $('#error-message');

    let currentNumber;
    let userSequence = '';
    let victories = 0;
    let timer;

    function generateNumber() {
        currentNumber = '';
        for (let i = 0; i < victories + 1; i++) {
            currentNumber += Math.floor(Math.random() * 10);
        }
        numberDisplay.text(currentNumber);
        userInput.prop('disabled', true); // Deshabilitar la entrada de texto
        errorDisplay.text(''); // Limpiar mensaje de error
    }

    function startGame() {
        userSequence = '';
        generateNumber();
        timer = setTimeout(() => {
            clearNumber();
            userInput.prop('disabled', false); // Habilitar la entrada de texto
        }, 2000); // El número se muestra durante 2 segundos
    }

    function clearNumber() {
        numberDisplay.text('');
    }

    function checkInput() {
        const userInputValue = userInput.val();
        if (userInputValue === currentNumber) {
            userSequence += userInputValue;
            userInput.val('');
            if (userSequence.length === currentNumber.length) {
                victories++;
                victoriesDisplay.text('Victorias: ' + victories);
                if (victories < 20) {
                    startGame();
                } else {
                    alert('¡Felicidades! Has completado el juego.');
                }
            } else {
                generateNumber();
                timer = setTimeout(() => {
                    clearNumber();
                    userInput.prop('disabled', false); // Habilitar la entrada de texto
                }, 2000); // El número se muestra durante 2 segundos
            }
        } else {
            alert('¡Has fallado!');
            victories = 0;
            victoriesDisplay.text('Victorias: ' + victories);
            userInput.val('');
            startGame();
        }
    }

    function retryGame() {
        victories = 0;
        victoriesDisplay.text('Victorias: ' + victories);
        userInput.val('');
        startGame();
    }

    startBtn.on('click', startGame);
    checkBtn.on('click', checkInput);
    retryBtn.on('click', retryGame);

    userInput.on('keydown', function(event) {
        if (numberDisplay.text() !== '') {
            event.preventDefault(); // Bloquear la entrada de texto mientras se muestra el número
        }
    });
});
