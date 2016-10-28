var juego = {
    'filas': [
        [],
        [],
        []
    ],
    'espacioVacio': {
        fila: 2,
        columna: 2
    },
    'iniciar': function(elemento) {
        this.instalarPiezas(elemento);
        this.mezclarFichas(50);
        this.capturarTeclas();
    },
    crearPieza: function(numero, fila, columna) {
        var pieza = $('<div/>');
        pieza.addClass('pieza');
        pieza.css({
            'backgroundImage': 'url("piezas/' + numero + '.jpg")',
            'top': 200 * fila + 'px',
            'left': 200 * columna + 'px'
        });

        return {
            dom: pieza,
            fila: fila,
            columna: columna,
            numero: numero
        };
    },
    instalarPiezas: function(elemento) {
        var numero = 1;
        for (var fila = 0; fila < 3; fila++) {
            for (var columna = 0; columna < 3; columna++) {
                if (fila === this.espacioVacio.fila &&
                    columna === this.espacioVacio.columna) {
                    this.filas[fila][columna] = null;
                } else {
                    var pieza = this.crearPieza(numero, fila, columna);
                    this.filas[fila][columna] = pieza;
                    numero++;
                    elemento.append(pieza.dom);
                }
            }
        }
    },
    chequearSiGano: function() {
        var gano=true;
        for (var fila = 0; fila < 3; fila++) {
            for (var columna = 0; columna < 3; columna++) {
                var pieza= this.filas[fila][columna];
                if(pieza===null) {
                    continue;
                }
                var filaInicial=pieza.fila;
                var ColumnaInicial=pieza.columna;
                if(filaInicial!==fila || ColumnaInicial!==columna) {
                    gano=false;
                }
            }
        }
        if(gano) {
            alert("GANO EL JUEGO");
        }        
    },
    mezclarFichas: function(veces) {
        var mover= ["moverHaciaAbajo","moverHaciaArriba","moverHaciaLaDerecha","moverHaciaLaIzquierda"];
        for(var i=0;i<veces;i++) {
            
            var random= Math.random()*4;
            random= Math.floor(random);
            var metodo= mover[random];
            this[metodo]()
        
    }
    },
    moverFichaFilaColumna: function(ficha) {
        console.log(this.filas[2][2]); 
        var fila = this.espacioVacio.fila;
        var columna = this.espacioVacio.columna;
        ficha.dom.animate({
            'left': columna * 200 + 'px',
            'top': fila * 200 + 'px'
        },100);
        this.filas[fila][columna] = ficha;
        console.log(this.filas[2][2]); 
    },
    guardarEspacioVacio: function(fila, columna) {
        console.log(this.filas[1][2]); 
        this.espacioVacio.fila = fila;
        this.espacioVacio.columna = columna;
        this.filas[fila][columna] = null;
        console.log(this.filas[1][2]); 
    },
    intercambiarPosicionConEspacioVacio: function(fila, columna) {
        var ficha = this.filas[fila][columna];
        this.moverFichaFilaColumna(ficha);
        this.guardarEspacioVacio(fila, columna);
    },
    moverHaciaAbajo: function() {
        if( this.espacioVacio.fila===0) {
            return;
        }
        var filaOrigen = this.espacioVacio.fila - 1;
        var columnaOrigen = this.espacioVacio.columna;
        
        this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
        this.chequearSiGano()
    },
    moverHaciaArriba: function() {
        if(this.espacioVacio.fila===this.filas.length -1) {
            return;
        }
        var filaOrigen = this.espacioVacio.fila + 1;
        var columnaOrigen = this.espacioVacio.columna;
         this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
         this.chequearSiGano()
    },
    moverHaciaLaDerecha: function() {
        if(this.espacioVacio.columna===0) {
            return;
        }
        var filaOrigen = this.espacioVacio.fila;
        var columnaOrigen = this.espacioVacio.columna - 1;
         this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
         this.chequearSiGano()
    },
    moverHaciaLaIzquierda: function() {
        if(this.espacioVacio.columna===this.filas[0].length -1 ) {
            return;
        }
       var filaOrigen = this.espacioVacio.fila;
        var columnaOrigen = this.espacioVacio.columna + 1;
         this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
         this.chequearSiGano()
    },
    capturarTeclas: function() {
        var that = this;

        var keyListener = function(event) {
            switch (event.which) {
                case 37:
                    that.moverHaciaLaIzquierda();
                    break;
                case 38:
                    that.moverHaciaArriba();
                    break;
                case 39:
                    that.moverHaciaLaDerecha();
                    break;
                case 40:
                    that.moverHaciaAbajo();
                    break;
                default:
                    console.log("Tecla invalida");
                    break;
            }
        };

        $(document).keydown(keyListener);
    }
};

$(document).ready(function() {
    juego.iniciar($('#juego'));
});