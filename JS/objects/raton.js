class Raton{
    constructor(escena){
        this.escena = escena;


        //ENEMIGO
        this.velocidadEnemigo = 120;
        this.destinoX =50;
        this.destinoY = 500;
        this.cestaX = 50;
        this.cestaY = 500;
        this.huirX = 50;
        this.huirY = -100;
        this.direccion = {x:0,y:0};
    

        //Maquina de estados ENEMIGO
        this.RATIRCESTA = 0;
        this.RATHUIR = 1;
        this.RATBUSCAR = 2;
        this.RATQUIETO = 3;
        this.estadoActualRata = this.RATIRCESTA;
        this.osoCerca = false;
        this.tiempoBuscar = 400;
        this.ContadorBuscar = this.tiempoBuscar;
        this.distSusto = 150;
        this.tiempoAparecer = 200;
        this.contadorAparecer = this.tiempoAparecer;
        this.ratioRobo = 120; //Cada cuanto roba un pez
        this.contRatioRobo = this.ratioRobo; //Cada cuanto roba un pez
         
    }

    create(){
        //instancio el enemigo
        this.raton = this.escena.physics.add.sprite(100,-50,'spr_raton');
    }

    update(){
       
        //ENEMIGO
        this.direccion = this.Direccion();
            
        
        
       

        //MAQUINA DE ESTADOS RATON
        switch(this.estadoActualRata)
        {
            case(this.RATQUIETO):
                this.raton.setVelocityX(0);
                this.raton.setVelocityY(0);

                this.contadorAparecer -= 1;
                //logica canvio de estado
                if(this.osoCerca){
                    this.estadoActualRata = this.RATHUIR;
                }
                if(this.contadorAparecer <= 0){
                    this.estadoActualRata = this.RATIRCESTA;
                    this.contadorAparecer = this.tiempoAparecer;
                }                
                break;
            case(this.RATIRCESTA):
                this.destinoX = this.cestaX; this.destinoY = this.cestaY; //Marca el destino en la cesta.
                this.raton.setVelocityX(this.velocidadEnemigo * this.direccion.x);
                this.raton.setVelocityY(this.velocidadEnemigo * this.direccion.y);

                //logica canvio de estado
                if(this.DistanciaJugador() < this.distSusto){
                    this.estadoActualRata = this.RATHUIR;
                }
                else if(this.DistanciaCesta() < 10){
                    this.estadoActualRata = this.RATBUSCAR;
                }
                break;
            case(this.RATBUSCAR):
                this.raton.setVelocityX(0);
                this.raton.setVelocityY(0);

                if(this.contRatioRobo <= 0 && this.escena.datosPartida.pezes != 0){
                    this.escena.datosPartida.pezes -= 1;
                    this.contRatioRobo = this.ratioRobo;                    
                }

                this.contRatioRobo -= 1;
                this.ContadorBuscar -= 1;
                //Condicion cambio de estado
                if(this.ContadorBuscar <= 0){
                    this.estadoActualRata = this.RATHUIR;
                    this.ContadorBuscar = this.tiempoBuscar;
                    this.contRatioRobo = this.ratioRobo;
                }
                if(this.DistanciaJugador() < this.distSusto){
                    this.estadoActualRata = this.RATHUIR;
                    this.ContadorBuscar = this.tiempoBuscar;
                    this.contRatioRobo = this.ratioRobo;
                }
                

                break;
            case(this.RATHUIR):
                this.destinoX = this.huirX; this.destinoY = this.huirY; //Marca el destino como huida.
                this.raton.setVelocityX(this.velocidadEnemigo * this.direccion.x);
                this.raton.setVelocityY(this.velocidadEnemigo * this.direccion.y);
                if(this.DistanciaDest() < 1){
                    this.estadoActualRata = this.RATQUIETO;
                }
                break;
            

        }

    }

    //Metodos

    //Pre:--Post: Calcula el vector de direccion Normalizado segun el origen y el destino.
    Direccion() {
             
        var ratonX = this.raton.x;
        var ratonY = this.raton.y;
        var xDir = this.destinoX - ratonX;
        var yDir = this.destinoY - ratonY;
        var mod = Math.sqrt(xDir*xDir+yDir*yDir); // normaliza el vector Fachero.
        xDir = xDir / mod;
        yDir = yDir /mod;
        var res = {x:xDir,y:yDir};        
        return res;

    }

    //Pre:-- Post: devuelve la distancia en pixeles de la cesta.
    DistanciaCesta(){
        var ratonX = this.raton.x;
        var ratonY = this.raton.y;
        var xLengh = this.cestaX - ratonX;
        var yLengh = this.cestaY - ratonY;
        var mod = Math.sqrt(xLengh*xLengh+yLengh*yLengh);
        return mod;
    }

    //Pre:-- Post: devuelve la distancia del jugador.
    DistanciaJugador(){
        var ratonX = this.raton.x;
        var ratonY = this.raton.y;
        var xLengh = this.escena.jugadorX - ratonX;
        var yLengh = this.escena.jugadorY - ratonY;
        var mod = Math.sqrt(xLengh*xLengh+yLengh*yLengh);
        return mod;
    }

    DistanciaDest(){
        var ratonX = this.raton.x;
        var ratonY = this.raton.y;
        var xLengh = this.destinoX - ratonX;
        var yLengh = this.destinoY - ratonY;
        var mod = Math.sqrt(xLengh*xLengh+yLengh*yLengh);
        return mod;
    }

}








