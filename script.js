"use strict"

const midaCasella = 100
const numFiles = 3
const numColumnes = 3

let posicioActual = {
  fila: 0,
  columna: 0
}

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
      refCasella.textContent = `${fila * numColumnes + columna}`
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

function mouFitxa(fila, columna) {

  // Actualitzar les dades del joc
  posicioActual.fila = fila
  posicioActual.columna = columna

  // Mostrar canvis a la web
  actualitzaDOM()
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
