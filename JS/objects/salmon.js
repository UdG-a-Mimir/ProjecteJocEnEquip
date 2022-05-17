class Salmon{
    constructor(escena){
        this.escena = escena; 
        this.arraySalmones = [];
        this.tiempo = 100;
        this.nSalmones = 0;
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
        
        this.tiempo = tiempo;
        this.nSalmones += 1;
    }
}