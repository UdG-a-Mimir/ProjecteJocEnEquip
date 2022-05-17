"use strict";
/*
class Player{
    constructor(escena){
        this.escena = escena; 
    }

    updatePlayer(){
    
    }
}
*/
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
        this.spr_jugador;
        this.jugador = null;
     
        
        //Maquina de estados jugador
        this.QUIETO = 0;
        this.CAMINAR_IZQ = 1;
        this.CAMINAR_DER = 2;
        this.estadoActual = this.QUIETO;
        this.encenderAnimacion = true;

        //Variables movimiento jugador
        this.velocidad = 100;
        
        //SAUl
        {

        }

        //Jaume
        {
           
        
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

        //carga de sprites
        this.load.spritesheet('spr_oso','../../ASSETS/oso_64.png',{frameWidth: 64,frameHeight: 64});
        this.load.spritesheet('spr_salmon','../../ASSETS/spr_salmon.png',{frameWidth: 16,frameHeight: 32});
         //SAUl
        {

        }   

        //Jaume
        {
            this.load.image('spr_mapa','../../ASSETS/mapaPrincipal.png');
            this.load.spritesheet('spr_raton','../../ASSETS/raton_32.png',{frameWidth: 32,frameHeight: 32});

        }
	}
	
    create (){	
        this.add.image(400,300,'spr_mapa');	
        //Cramos el Jugadir
        {
            //Instanciar Jugador.
            this.jugador = this.physics.add.sprite(300,480,'spr_oso');
            
            
            //Animación de mover Jugador.
            this.anims.create({
                key: 'mov',
                frames: this.anims.generateFrameNumbers('spr_oso',{start: 0, end: 3}),
                frameRate: 9,
                repeat: -1
            })

            //Animación Jugador quieto.
            this.anims.create({
                key: 'quieto',
                frames: this.anims.generateFrameNumbers('spr_oso',{start: 4, end: 4}),
                frameRate: 9,
                repeat: -1
            })

            this.cursor = this.input.keyboard.createCursorKeys();
        }

        //SAUl
        {

        }

        //Jaume
        {
            this.raton = new Raton(this);
            this.raton.create();
        }
	}
	
	update (){    
        //Actualiza el HUD
        this.etiPuntos.text = "Puntos: " + this.datosPartida.puntos;
        this.etiVida.text = "Vida: " + this.datosPartida.vida;
        
        //Maquina de estados Jugador
        switch(this.estadoActual)
        {   
            //Logica del estado
            case(this.QUIETO):
                if(this.encenderAnimacion)
                {
                    this.jugador.anims.play('quieto');
                    this.encenderAnimacion = false;
                }
                this.jugador.setVelocityX(0);

                //Condicion cambio de estado
                if(this.cursor.left.isDown){this.encenderAnimacion = true;this.estadoActual = this.CAMINAR_IZQ;} 
                else if(this.cursor.right.isDown) {this.encenderAnimacion = true;this.estadoActual = this.CAMINAR_DER;}
                break;
            case(this.CAMINAR_DER):
                //Logica del estado
                if(this.encenderAnimacion)
                {
                    this.jugador.anims.play('mov');
                    this.encenderAnimacion = false;
                    this.jugador.flipX = false;
                }
                this.jugador.setVelocityX(this.velocidad);

                //Condicion cambio de estado
                if(!this.cursor.right.isDown) {this.encenderAnimacion = true;this.estadoActual = this.QUIETO;}
                break;
            case(this.CAMINAR_IZQ):
                //Logica del estado
                if(this.encenderAnimacion)
                {
                    this.jugador.anims.play('mov');
                    this.encenderAnimacion = false;
                    this.jugador.flipX = true;
                }
                this.jugador.setVelocityX(-this.velocidad);
                //Condicion cambio de estado
                if(!this.cursor.left.isDown) {this.encenderAnimacion = true;this.estadoActual = this.QUIETO;}
                break;
        }

        //SAUl
        {

        }

        //Jaume
        {
            this.raton.update();

        }

    }

    
    //Espacio para funciones
    //SAUl
    
    //FIN SAUL
    //Jaume

    //FIN JAUME
    

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


