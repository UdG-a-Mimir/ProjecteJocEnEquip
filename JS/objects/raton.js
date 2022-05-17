class Raton{
    constructor(escena){
        this.escena = escena;

         //ENEMIGO
         this.velocidadEnemigo = 120;
         var destinoX =50;
         var destinoY = 500;

         //Maquina de estados ENEMIGO
         this.RATIRCESTA = 0;
         this.RATHUIR = 1;
         this.RATBUSCAR = 2;
         this.RATQUIETO = 3;
         this.estadoActualRata = this.RATQUIETO;

         
    }

    create(){
        //instancio el enemigo
        this.raton = this.escena.physics.add.sprite(350,300,'spr_raton');
    }

    update(){
       
           //ENEMIGO
            
            //Calculo de direccion
           
            var ratonX = this.raton.x;
            var ratonY = this.raton.y;
            var xDir = destinoX - ratonX;
            var yDir = destinoY - ratonY;
            var mod = Math.sqrt(xDir*xDir+yDir*yDir);
            xDir = xDir / mod;
            yDir = yDir /mod;
          
            


            this.raton.setVelocityX(this.velocidadEnemigo * xDir);
            this.raton.setVelocityY(this.velocidadEnemigo * yDir);

            //MAQUINA DE ESTADOS RATON

            switch(this.estadoActualRata)
            {
                case(this.RATQUIETO):
                    this.raton.setVelocityX(0);
                    this.raton.setVelocityY(0);

                    //logica canvio de estado

                    break;
                case(this.RATIRCESTA):

                    break;
                case(this.RATBUSCAR):
                    break;
                case(this.RATHUIR):
                    break;
                

            }

    }

    //Metodos

    //Pre:--Post: Calcula el vector de direccion Normalizado segun el origen y el destino.
    Direccion() {
        
    }
}






