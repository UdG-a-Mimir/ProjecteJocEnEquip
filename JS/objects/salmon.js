class Salmon{
    constructor(escena,jugador){
        this.escena = escena; 
        this.arraySalmones = [];
        this.tiempo = 100;
        this.nSalmones = 0;
        this.jugador = jugador;
    }
    create(){
        this.invoca();
    }
    update(){
        this.tiempo -= 1;
        if (this.tiempo <= 0){
            this.invoca();
        }
    }
    invoca(){
        let vel = Phaser.Math.Between(30, 150);
        let posX = Phaser.Math.Between(270, 560);
        let tiempo = Phaser.Math.Between(100, 200);
        
        this.arraySalmones[this.nSalmones] = this.escena.physics.add.sprite(posX,-16,'spr_salmon');
        this.arraySalmones[this.nSalmones].setVelocityY(vel);
        
        { //Creamos la colision del salmon con el jugador.
            this.escena.physics.add.overlap(this.arraySalmones[this.nSalmones],this.jugador,(sal,jug)=>this.entroBocaOso(sal,jug));
          
        }

        this.tiempo = tiempo;
        this.nSalmones += 1;
    }
     //Se ejecuta cuando el pez toca el oso.
    entroBocaOso(sal,jug){
        console.log("Pez comido");
        this.escena.nPecesBoca += 1;
        sal.destroy();
    }
}