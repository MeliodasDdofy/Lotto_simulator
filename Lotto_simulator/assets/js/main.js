document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('quickpick').addEventListener('click', (event) => {
        event.preventDefault();
        const numGames = parseInt(document.getElementById('numgames').value);
        if (isNaN(numGames) || numGames < 1 || numGames > 12) {
            alert("Bitte geben Sie die Anzahl der Spiele ein, die Sie spielen möchten, bevor Sie eine zufällige Auswahl treffen.");
        } else {
            doQuickPick();
        }
    });

    document.getElementById('runsim').addEventListener('click', (event) => {
        event.preventDefault();
        doRunSim();
    });

    document.getElementById('numgames').addEventListener('change', (event) => {
        updateGameInputs();
    });
});

function doQuickPick() {
    const numGames = parseInt(document.getElementById('numgames').value);
    for (let game = 1; game <= numGames; game++) {
        const picks = [];
        while (picks.length < 6) {
            const randomNum = Math.floor(Math.random() * 49) + 1;
            if (!picks.includes(randomNum)) {
                picks.push(randomNum);
            }
        }
        picks.sort((a, b) => a - b);
        for (let i = 1; i <= 6; i++) {
            document.getElementById(`picks${i}_${game}`).value = picks[i - 1];
        }
    }
}

function updateGameInputs() {
    const numGames = parseInt(document.getElementById('numgames').value);
    const gameInputsContainer = document.getElementById('gameInputs');
    gameInputsContainer.innerHTML = ''; // Clear previous inputs
    for (let game = 1; game <= numGames; game++) {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('game');
        gameDiv.innerHTML = `
            <label for="picks1_${game}">Spiel ${game} - :</label> <br>
            <input class="btn btn-outline-danger" type="number" name="picks1_${game}" id="picks1_${game}" required min="1" max="49" step="1">
            <label for="picks2_${game}">-</label>
            <input class="btn btn-outline-danger" type="number" name="picks2_${game}" id="picks2_${game}" required min="1" max="49" step="1">
            <label for="picks3_${game}">-</label>
            <input class="btn btn-outline-danger" type="number" name="picks3_${game}" id="picks3_${game}" required min="1" max="49" step="1">
            <label for="picks4_${game}">-</label>
            <input class="btn btn-outline-danger" type="number" name="picks4_${game}" id="picks4_${game}" required min="1" max="49" step="1">
            <label for="picks5_${game}">-</label>
            <input class="btn btn-outline-danger" type="number" name="picks5_${game}" id="picks5_${game}" required min="1" max="49" step="1">
            <label for="picks6_${game}">-</label>
            <input class="btn btn-outline-danger" type="number" name="picks6_${game}" id="picks6_${game}" required min="1" max="49" step="1">
        `;
        gameInputsContainer.appendChild(gameDiv);
    }
}

function generateTicketNumber() {
    let ticketNumber = '';
    for (let i = 0; i < 12; i++) {
        ticketNumber += Math.floor(Math.random() * 10);
    }
    return ticketNumber;
}

function doRunSim() {
    const picks = [];
    const numGames = parseInt(document.getElementById('numgames').value);
    if (isNaN(numGames) || numGames < 1 || numGames > 12) {
        alert("Bitte geben Sie eine gültige Anzahl von Spielen ein (zwischen 1 und 12).");
        return;
    }

    for (let game = 1; game <= numGames; game++) {
        const gamePicks = [];
        for (let i = 1; i <= 6; i++) {
            const pick = parseInt(document.getElementById(`picks${i}_${game}`).value);
            if (isNaN(pick) || pick < 1 || pick > 49) {
                alert(`Bitte geben Sie eine gültige Auswahl für Spiel ${game}, Auswahl ${i} ein (zwischen 1 und 49).`);
                return;
            }
            gamePicks.push(pick);
        }
        picks.push(gamePicks);
    }

    const ticketNumber = generateTicketNumber();
    const pinscheinText = `Ticket Number: ${ticketNumber}\n` + picks.map((gamePicks, index) => `Spiel ${index + 1}: ${gamePicks.join(', ')}`).join('\n');
    const blob = new Blob([pinscheinText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'pinschein.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    document.getElementById('resultsarea').innerText = `Ticket Number: ${ticketNumber}\n` + pinscheinText;
}