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
        this.etiPezes; 
        this.etiVidas;
        
        //Variables globales
        this.datosPartida = {
            pezes:0,
            vida:3
        }
        this.spr_jugador;
        this.jugador = null;
        
        //Inventario
        this.nPezesBoca = 0;
     
        
        //Maquina de estados jugador
        this.QUIETO = 0;
        this.CAMINAR_IZQ = 1;
        this.CAMINAR_DER = 2;
        this.estadoActual = this.QUIETO;
        this.encenderAnimacion = true;

        //Variables movimiento jugador
        this.velocidad = 100;
        this.jugadorX;
        this.jugadorY;
        
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

     
   

        //carga de sprites
        {
            //Sprites
            this.load.image('spr_mapa','../../ASSETS/mapaPrincipal.png');
            this.load.image('spr_cesta','../../ASSETS/Cesta.png');
            //Hojas de sprite
            this.load.spritesheet('spr_oso','../../ASSETS/oso_64.png',{frameWidth: 64,frameHeight: 64});
            this.load.spritesheet('spr_salmon','../../ASSETS/spr_salmon.png',{frameWidth: 32,frameHeight: 32});          
            this.load.spritesheet('spr_raton','../../ASSETS/raton_32.png',{frameWidth: 32,frameHeight: 32});
        }
    
       
	}
	
    create (){	
        this.add.image(400,300,'spr_mapa');	
        //Creación del jugador
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
                frames: this.anims.generateFrameNumbers('spr_oso',{start: 8, end: 8}),
                frameRate: 9,
                repeat: -1
            })

            this.cursor = this.input.keyboard.createCursorKeys();
        }

        //Instanciar Objetos estaticos
        {
            //Instanciamos la cesta
            this.cesta = this.physics.add.sprite(50, 480,'spr_cesta');
        }

        //Definimos las colisiones.
        {
            this.physics.add.overlap(this.cesta,this.jugador,(cesta,jugador)=>this.osoPoneEnCesta(cesta,jugador));
        }
        
        //SAUl
        {
            this.salmon = new Salmon(this,this.jugador);
            this.salmon.create();
        }

        //Jaume
        {
            this.raton = new Raton(this);
            this.raton.create();

           
        }

        //Creacion de Etiquetas
        {
            this.etiPezes = this.add.text(16,16, 'Pezes: ' + this.datosPartida.puntos,{fontSize:'32px',fill: '#000'});
            this.etiVida = this.add.text(600,16, 'Vida: ' + this.datosPartida.vida,{fontSize:'32px',fill: '#000'})
        }
	}
	
	update (){    
        //Actualiza el HUD
        {
            this.etiPezes.text = "Pezes: " + this.datosPartida.pezes;
            this.etiVida.text = "Vida: " + this.datosPartida.vida;
        }
       
        
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
                //Actualizo la pos del jugador para los enemigos
                this.jugadorX = this.jugador.x;
                this.jugadorY = this.jugador.y;
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
                //Actualizo la pos del jugador para los enemigos
                this.jugadorX = this.jugador.x;
                this.jugadorY = this.jugador.y;
                //Condicion cambio de estado
                if(!this.cursor.left.isDown) {this.encenderAnimacion = true;this.estadoActual = this.QUIETO;}
                break;
        }

        //SAUl
        {
            this.salmon.update();
        }

        //Jaume
        {
            this.raton.update();
            console.log(this.nPezesBoca);
        }

    }

    
    osoPoneEnCesta(cesta,jugador){
        this.datosPartida.pezes += this.nPezesBoca;
        this.nPezesBoca = 0;
    }
    


    //Carga la partida del localStorage
    carrgarPartida(){
         //Accedo a la configuración de las opciones
         var json = localStorage.getItem("datosPartida") || '{"pezes":0,"vida":3}';
         console.log(json);
         this.datosPartida = JSON.parse(json);
    }
    //Guarda la partida a localStorage
    guardarPartida(){
       localStorage.setItem("datosPartida",JSON.stringify(this.datosPartida));
    }
}


