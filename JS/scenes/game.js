class GameScene extends Phaser.Scene {

    constructor (){
        super('GameScene');

        //Etiquetas
        this.etiPuntos; 
        this.etiVidas;
        
        //Variables globales
        this.datosPartida = {
            puntos:0,
            vida:3
        }
       
     
    }

    preload (){	

        //Cargar partida
        this.carrgarPartida();

        //Color del fondo
        this.cameras.main.setBackgroundColor("#d1d1d1")

        //Creacion de Etiquetas
        this.etiPuntos = this.add.text(16,16, 'Puntos: ' + this.datosPartida.puntos,{fontSize:'32px',fill: '#000'});
        this.etiVida = this.add.text(600,16, 'Vida: ' + this.datosPartida.vida,{fontSize:'32px',fill: '#000'})

	}
	
    create (){			
       
	}
	
	update (){    
        //Creacion de Etiquetas
        this.etiPuntos.text = "Puntos: " + this.datosPartida.puntos;
        this.etiVida.text = "Vida: " + this.datosPartida.vida;

    }

    
    //Carga la partida del localStorage
    carrgarPartida(){
         //Accedo a la configuración de las opciones
         var json = localStorage.getItem("datosPartida") || '{"puntos":100,"vida":3}';
         console.log(json);
         this.datosPartida = JSON.parse(json);
    }
    //Guarda la partida a localStorage
    guardarPartida(){
       localStorage.setItem("datosPartida",JSON.stringify(this.datosPartida));
    }
}


