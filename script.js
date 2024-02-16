
let currentPlayer = 'circle'; // Spieler beginnt mit 'circle'
let fields = [
    null, null, null,
    null, null, null,
    null, null, null
];

function init() {
    render();
}

function render() {
    let contentDiv = document.getElementById('content');
    let tableHtml = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = generateXSVG();
            }
            tableHtml += `<td onclick="placeSymbol(${index})">${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }

    tableHtml += '</table>';
    contentDiv.innerHTML = tableHtml;
}

function placeSymbol(index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer; // Setze das Symbol des aktuellen Spielers
        let symbol = currentPlayer === 'circle' ? generateCircleSVG() : generateXSVG();
        let cell = document.getElementsByTagName('td')[index];
        cell.innerHTML = symbol;
        cell.onclick = null;

        const winInfo = checkWin();
        if (winInfo !== null) {
            // Gewinnlinie zeichnen
            restart();
            stopGame();
            winningLine(winInfo.indexes);
        } else {
            // Überprüfe auf Unentschieden (Alle Felder sind belegt und niemand hat gewonnen)
            if (fields.every(field => field !== null)) {
                alert("Unentschieden!");
            } else {
                // Wechsel den Spieler
                currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
            }
        }
    }
}

function restart() {
    document.getElementById('restart-button').classList.remove('d-none');
}


function stopGame() {
    const cells = document.getElementsByTagName('td');
    for (let cell of cells) {
        cell.onclick = null; // Entferne den Event-Handler für das Klicken
    }
}



function checkWin() {
    const winConditions = [
        // Horizontale Linien
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Vertikale Linien
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonale Linien
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (fields[a] !== null && fields[a] === fields[b] && fields[a] === fields[c]) {
            return { winner: fields[a], indexes: condition };
        }
    }

    return null;
}



function winningLine(indexes) {
    const cells = document.getElementsByTagName('td');
    const [a, b, c] = indexes;
    const cellA = cells[a];
    const cellB = cells[b];
    const cellC = cells[c];

    const cellRectA = cellA.getBoundingClientRect();
    const cellRectB = cellB.getBoundingClientRect();
    const cellRectC = cellC.getBoundingClientRect();

    const tableRect = document.getElementsByTagName('table')[0].getBoundingClientRect();

    const line = document.createElement('div');
    line.classList.add('winning-line');
    line.style.backgroundColor = 'white'; // Linie ist weiß
    line.style.width = '3px'; // Breite der Linie ist 3 Pixel
    line.style.border = '2px solid black';
    line.style.zindex = '999';
    line.style.position = 'static';



    // Mittelpunkte der Zellen berechnen
    const middleX = (cellRectA.left + cellRectB.left + cellRectC.left) / 3 - tableRect.left;
    const middleY = (cellRectA.top + cellRectB.top + cellRectC.top) / 3 - tableRect.top;

    // Länge und Winkel der Linie berechnen
    const width = Math.sqrt((cellRectA.width * cellRectA.width + cellRectA.height * cellRectA.height) / 2);
    const angle = Math.atan2(cellRectB.top - cellRectA.top, cellRectB.left - cellRectA.left) * (180 / Math.PI);

    line.style.left = `${middleX}px`;
    line.style.top = `${middleY}px`;
    line.style.width = `300px`;
    line.style.transform = `rotate(${angle}deg)`;
    
   document.getElementById('content').appendChild(line);
}

function generateCircleSVG() {
    const width = 60;
    const height = 60;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 28;

    const svgCode = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${centerX}" cy="${centerY}" r="0" fill="none" stroke="rgb(114, 180, 255)" stroke-width="3">
                <animate attributeName="r" from="0" to="${radius}" dur="1s" fill="freeze" />
            </circle>
        </svg>
    `;

    return svgCode;
}

function generateXSVG() {
    const width = 60;
    const height = 60;
    const centerX = width / 2;
    const centerY = height / 2;

    const svgCode = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <line x1="${centerX - 15}" y1="${centerY - 15}" x2="${centerX + 15}" y2="${centerY + 15}" stroke="yellow" stroke-width="5">
                <animate attributeName="x2" from="${centerX - 15}" to="${centerX + 15}" dur="1s" fill="freeze" />
                <animate attributeName="y2" from="${centerY - 15}" to="${centerY + 15}" dur="1s" fill="freeze" />
            </line>
            <line x1="${centerX + 15}" y1="${centerY - 15}" x2="${centerX - 15}" y2="${centerY + 15}" stroke="yellow" stroke-width="5">
                <animate attributeName="x2" from="${centerX + 15}" to="${centerX - 15}" dur="1s" fill="freeze" />
                <animate attributeName="y2" from="${centerY - 15}" to="${centerY + 15}" dur="1s" fill="freeze" />
            </line>
        </svg>
    `;

    return svgCode;
}







  