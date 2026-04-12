"use strict"

const midaCasella = 100
const numFiles = 3
const numColumnes = 3

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
            refCasella.addEventListener("click", () => mouFitxa(fila, columna))

            const index = fila * numColumnes + columna
            const ultimaCasella = numFiles * numColumnes - 1

            // SOLO si NO es la última casilla, añadimos imagen
            if (index !== ultimaCasella) {
                const img = document.createElement("img")

                img.src = `img/fosil${index + 1}.png`
                img.alt = `fosil${index + 1}`
                img.style.width = "100%"
                img.style.height = "100%"

                refCasella.appendChild(img)
            }

            refCasella.style.left = `${columna * midaCasella}px`
            refCasella.style.top = `${fila * midaCasella}px`
            refTauler.appendChild(refCasella)
        
        }
    }

    // Crear la fitxa blava que es mourà pel tauler
    var refFitxa = document.createElement("div")
    refFitxa.setAttribute("id", "fitxaBlava")

    // Afegir la fitxa blava al tauler
    refTauler.appendChild(refFitxa)

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

function mouFitxa(fila, columna) {

    let vacio = comprobarAdyacentes(posicioActual, fila, columna);

    if (vacio != null) {
        // Mostrar canvis a la web
        actualitzaDOM()
    }
    
}

function actualitzaDOM() {

    // Calcular la posició en píxels a partir de la fila i columna
    const posicioX = posicioActual.columna * midaCasella
    const posicioY = posicioActual.fila * midaCasella

    // Aplicar la transformació CSS per moure la fitxa
    const refFitxa = document.getElementById("fitxaBlava")
    refFitxa.style.transform = `translate(${posicioX}px, ${posicioY}px)`
    
    // Actualitzar informació de la posició
    const refInfo = document.getElementById("info")
    refInfo.textContent = `Fila: ${posicioActual.fila}, Columna: ${posicioActual.columna}`
}

function reinicia() {
    mouFitxa(1, 1)
}
