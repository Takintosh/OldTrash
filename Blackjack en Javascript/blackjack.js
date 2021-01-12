//Para iniciar la partida ejecutar la funcion "iniciar()"

var baraja = [];
var palos = ["Corazon", "Diamante", "Pica", "Trebol"];
var signos = ["As", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var valores = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
var manoCroupier = [];
var manoJugador = [];
var puntajeCroupier = 0;
var puntajeJugador = 0;
var posBaraja = 0;

function mazo() {
    var n = 0;
    for (var i = 0; i < palos.length; i++) {
        for (var j = 0; j < valores.length; j++) {
            baraja[n] = {palo: palos[i], signo: signos[j], valor: valores[j]};
            n++;
        }
    }
}
;

function barajar() {
    var barajaTemporal = [];
    for (var i = 0; i < baraja.length; i++) {
        do {
            var posicion = Math.floor((Math.random() * baraja.length));
        } while (!!barajaTemporal[posicion]);
        barajaTemporal[posicion] = baraja[i];
    }
    baraja = barajaTemporal;
}
;

function limpiar() {
    baraja = [];
    manoCroupier = [];
    manoJugador = [];
    puntajeCroupier = 0;
    puntajeJugador = 0;
    posBaraja = 0;
}
;

function mostrarMano() {
    console.log("El croupier tiene " + manoCroupier[0].signo + " de " + manoCroupier[0].palo + ", por lo tanto tiene " + manoCroupier[0].valor + " puntos");
    console.log("Tu mano: ");
    for (i = 0; i < manoJugador.length; i++) {
        console.log(manoJugador[i].signo + " de " + manoJugador[i].palo);
    }
    verificarManoJ();
}
;

function puntJugador() {
    puntajeJugador = 0;
    var as = false;
    for (i = 0; i < manoJugador.length; i++) {
        if (manoJugador[i].signo === "As") {
            as = true;
        }
        ;
        puntajeJugador = puntajeJugador + manoJugador[i].valor;
    }
    if ((puntajeJugador > 21) && (as === true)) {
        puntajeJugador = puntajeJugador - 10;
    }
    ;
}
;

function verificarManoJ() {
    puntJugador();
    if ((puntajeJugador === 21) && (manoJugador.length === 2)) {
        console.log("Blackjack! Haz ganado!");
        limpiar();
    } else if (puntajeJugador > 21) {
        console.log("Tu puntaje es mayor a 21, Haz perdido!");
        limpiar();
    } else if ((puntajeJugador === 21) && (manoJugador.length > 2)) {
        console.log("Tienes 21 puntos, no puedes pedir mas cartas");
        parar();
    } else {
        console.log("Tienes " + puntajeJugador + " puntos");
        console.log("Ejecuta pedir() o parar()");
    }
}
;

function verificarManoC() {
    puntCroupier();
    if (puntajeCroupier === puntajeJugador) {
        console.log("Haz empatado con el croupier con " + puntajeCroupier + " puntos.");
        limpiar();
    } else if (puntajeCroupier > 21) {
        console.log("El Croupier se ha pasado. Haz Ganado!");
        limpiar();
    } else if ((puntajeCroupier <= 21) && (puntajeCroupier > puntajeJugador)) {
        console.log("El Croupier te ha ganado con " + puntajeCroupier + " puntos.");
        limpiar();
    }
}
;

function puntCroupier() {
    puntajeCroupier = 0;
    var as = false;
    for (i = 0; i < manoCroupier.length; i++) {
        if (manoCroupier[i].signo === "As") {
            as = true;
        }
        ;
        puntajeCroupier = puntajeCroupier + manoCroupier[i].valor;
    }
    if ((puntajeCroupier > 21) && (as === true)) {
        puntajeCroupier = puntajeCroupier - 10;
    }
    ;
}
;

function pedir() {
    manoJugador[manoJugador.length] = baraja[posBaraja];
    posBaraja++;
    mostrarMano();
}
;

function parar() {
    console.log("Turno del Croupier... ");
    console.log("Carta actual es " + manoCroupier[0].signo + " de " + manoCroupier[0].palo);
    console.log("Repartiendo:");
    var puntajeTemporal = 17;
    if (puntajeJugador > 17) {
        puntajeTemporal = puntajeJugador;
    }
    ;
    do {
        manoCroupier[manoCroupier.length] = baraja[posBaraja];
        posBaraja++;
        console.log(manoCroupier[manoCroupier.length - 1].signo + " de " + manoCroupier[manoCroupier.length - 1].palo);
        puntCroupier();
    } while (puntajeCroupier <= puntajeTemporal);
    verificarManoC();
}
;

function iniciar() {
    mazo();
    barajar();
    for (i = 0; i < 2; i++) {
        manoJugador[i] = baraja[posBaraja];
        posBaraja++;
    }
    manoCroupier[0] = baraja[posBaraja];
    posBaraja++;
    mostrarMano();
}
;