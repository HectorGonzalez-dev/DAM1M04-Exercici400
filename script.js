"use strict"

const midaCasella = 100
const numFiles = 3
const numColumnes = 3
const ultimaCasella = numFiles * numColumnes
let gameFinished = false;

const solucion = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
];

const directions = [
    [-1, 0], // arriba
    [1, 0],  // abajo
    [0, -1], // izquierda
    [0, 1],  // derecha
];

let posicioActual = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
];

let movimientos = 0;

function init() {

    // Definir els valors de les variables CSS
    const refCSSRoot = document.documentElement
    refCSSRoot.style.setProperty("--mida", midaCasella + "px")
    refCSSRoot.style.setProperty("--files", numFiles)
    refCSSRoot.style.setProperty("--columnes", numColumnes)

    // Obtenir referència al tauler on es col·locaran les caselles
    const refTauler = document.getElementById("tauler")

    // Afegir caselles al tauler
    for (let fila = 0; fila < numFiles; fila++) {
        for (let columna = 0; columna < numColumnes; columna++) {

            const refCasella = document.createElement("div")
            refCasella.classList.add("casella")

            let index = fila * numColumnes + columna + 1
            
            // Si es la última casilla, su índice será 0
            if (index === ultimaCasella) {
                index = 0
                refCasella.id = `casella-${index}`
                refCasella.classList.add("vacia")
            } else {
                refCasella.addEventListener("click", () => mouFitxa(index))
                refCasella.id = `casella-${index}`

                const img = document.createElement("img")

                img.src = `img/fosil${index}.png`
                img.alt = `fosil${index}`
                img.style.width = "100%"
                img.style.height = "100%"

                refCasella.appendChild(img)
            }

            refCasella.style.transform = `translate(${columna * midaCasella}px, ${fila * midaCasella}px)`
            refTauler.appendChild(refCasella)
        
        }
    }

    // Afegir event al botó de reset
    const refReset = document.getElementById("btnReinici")
    refReset.addEventListener("click", reinicia)

    reinicia()
}

function comprobarAdyacentes(matriz, fila, columna) {

    for (const direction of directions) {

        const nuevaFila = fila + direction[0];
        const nuevaColumna = columna + direction[1];

        // comprobar límites
        if (nuevaFila >= 0 && nuevaFila < matriz.length && nuevaColumna >= 0 && nuevaColumna < matriz[0].length) {
            if (matriz[nuevaFila][nuevaColumna] == 0) {
                return [nuevaFila, nuevaColumna];
            }
        }
    }

    return null;
}

function matricesIguales(a, b) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i].length !== b[i].length) return false;

        for (let j = 0; j < a[i].length; j++) {
            if (a[i][j] !== b[i][j]) {
                return false;
            }
        }
    }

    return true;
}


function mouFitxa(index) {
    if (gameFinished) return;
    let fila, columna;

    // Buscar la ficha en posicioActual
    for (let i = 0; i < posicioActual.length; i++) {
        for (let j = 0; j < posicioActual[i].length; j++) {
            if (posicioActual[i][j] === index) {
                fila = i;
                columna = j;
            }
        }
    }

    let vacio = comprobarAdyacentes(posicioActual, fila, columna);

    if (vacio != null) {

        posicioActual[vacio[0]][vacio[1]] = posicioActual[fila][columna];
        posicioActual[fila][columna] = 0;
        movimientos++;

        if (matricesIguales(posicioActual, solucion)) {
            const refwin = document.getElementById("winScreen")
            document.getElementById("movements").textContent = "Acabaste en " + movimientos + " movimientos";
            refwin.classList.add("win")
            gameFinished = true
        }

        actualitzaDOM([fila, columna], vacio);
    }

}

function actualitzaDOM(casilla, vacio) {

    document.getElementById("info").textContent = "Movimientos: " + movimientos;

    const refOrigen = document.getElementById(`casella-${posicioActual[vacio[0]][vacio[1]]}`);
    const refDesti = document.getElementById(`casella-${posicioActual[casilla[0]][casilla[1]]}`);

    refOrigen.style.transform = `translate(${vacio[1] * midaCasella}px, ${vacio[0] * midaCasella}px)`;
    refDesti.style.transform = `translate(${casilla[1] * midaCasella}px, ${casilla[0] * midaCasella}px)`;

}

function reinicia() {
    gameFinished = false;
    movimientos = 0;
    const refwin = document.getElementById("winScreen")
    if (refwin.classList.contains("win")) {
        refwin.classList.remove("win");
    }

    // Buscar vacio actual
    let fila, columna;

    for (let i = 0; i < posicioActual.length; i++) {
        for (let j = 0; j < posicioActual[i].length; j++) {
            if (posicioActual[i][j] === 0) {
                fila = i;
                columna = j;
            }
        }
    }

    for (let k = 0; k < 40; k++) {

        // Obtener movimientos válidos
        let movs = [];

        for (const d of directions) {
            const nf = fila + d[0];
            const nc = columna + d[1];

            if (nf >= 0 && nf < numFiles && nc >= 0 && nc < numColumnes) {
                movs.push([nf, nc]);
            }
        }

        // Elegir uno aleatorio
        const rand = Math.floor(Math.random() * movs.length);
        const [nf, nc] = movs[rand];

        // Intercambiar con el hueco
        posicioActual[fila][columna] = posicioActual[nf][nc];
        posicioActual[nf][nc] = 0;

        // Actualizar DOM
        actualitzaDOM([nf, nc], [fila, columna]);

        // Actualizar posición del hueco
        fila = nf;
        columna = nc;
    }
}