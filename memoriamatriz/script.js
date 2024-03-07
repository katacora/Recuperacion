document.addEventListener('DOMContentLoaded', function() {
    const gridContainer = document.getElementById('grid-container');
    const startBtn = document.getElementById('start-btn');
    const retryBtn = document.getElementById('retry-btn');
    const victoriesDisplay = document.getElementById('victories');
    const errorMessage = document.getElementById('error-message');

    let sequence = [];
    let userSequence = [];
    let victories = 0;

    function generateSequence() {
        sequence = [];
        for (let i = 0; i < victories + 1; i++) {
            sequence.push(Math.floor(Math.random() * 9) + 1); // Generar números aleatorios del 1 al 9
        }
    }

    function displaySequence() {
        gridContainer.innerHTML = ''; // Limpiar la cuadrícula antes de mostrar la nueva secuencia
        for (let i = 1; i <= 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = 'cell' + i;
            gridContainer.appendChild(cell);
        }
        let index = 0;
        let interval = setInterval(() => {
            if (index < sequence.length) {
                const cellId = 'cell' + sequence[index];
                const cell = document.getElementById(cellId);
                cell.classList.add('active');
                setTimeout(() => {
                    cell.classList.remove('active');
                }, 300); // Tiempo durante el cual la celda está iluminada (en milisegundos)
                index++;
            } else {
                clearInterval(interval);
            }
        }, 800); // Intervalo entre cada celda iluminada (en milisegundos)
    }

    function startGame() {
        generateSequence();
        displaySequence();
        userSequence = [];
        errorMessage.textContent = '';
        startBtn.disabled = true;
    }

    function checkInput() {
        const cellClicked = parseInt(this.id.substr(4));
        userSequence.push(cellClicked);
        const cell = document.getElementById('cell' + cellClicked);
        cell.classList.add('marked');
        setTimeout(() => {
            cell.classList.remove('marked');
        }, 300); // Tiempo durante el cual la celda está marcada (en milisegundos)
        if (userSequence.length === sequence.length) {
            if (JSON.stringify(userSequence) === JSON.stringify(sequence)) {
                victories++;
                victoriesDisplay.textContent = 'Victorias: ' + victories;
                startGame();
            } else {
                errorMessage.textContent = '¡Error! Intenta de nuevo pulsando Comenzar';
                startBtn.disabled = false;
                victories = 0; // Reiniciar el número de victorias
                victoriesDisplay.textContent = 'Victorias: ' + victories; // Actualizar el texto de victorias
                sequence = []; // Reiniciar la secuencia
                userSequence = []; // Reiniciar la secuencia del usuario
                displaySequence(); // Volver a mostrar la secuencia inicial
            }
        }
    }

    function retryGame() {
        victories = 0;
        victoriesDisplay.textContent = 'Victorias: ' + victories;
        startGame();
    }

    startBtn.addEventListener('click', startGame);
    retryBtn.addEventListener('click', retryGame);
    gridContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('cell')) {
            checkInput.call(event.target);
        }
    });
});
