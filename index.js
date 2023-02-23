// Importamos Express desde la carpeta node_modules
const express = require('express');
const cors=require("cors")

// Creamos la aplicación de Express
const app = express();
app.use(cors()); // corregimos errores de ACCESS del navegador
app.use(express.json()) // habilitamos recibir POST en formato JSON 

// Escojemos un puerto por el que el servidor web escuchará
const port = 8080;

class Jugador {
    constructor(id){
        this.id=id;
    }

    asignarMokepon(mokepon){ // metodo para guardar el mokepon elejido por cada Jug
        this.mokepon=mokepon
    }

    actualizarPosition(x,y){
        this.x=x;
        this.y=y;
    }
}

class Mokepon {
    constructor(nombre,x,y){
        this.nombre=nombre
        this.x=x
        this.y=y
    } 

}

const jugadores=[]; //guarda los jugadores que se conecten


app.get('/unirse', (req, res) => {
    const id=`${Math.random()}` //le damos un numero random de identificacion al conectado

    const jugador=new Jugador(id);

    jugadores.push(jugador) // guardamos los datos del nuevo jugador
    
    res.setHeader("Access-Control-Allow-Origin", "*") // para corregir el error de origenes de servidor 

    res.send(id);
});

app.post("/mokepon/:jugadorId", (req,res) => { //para saber que mokepones han elegido todos los jug conectados
    const jugadorId=req.params.jugadorId || "" // si no rercibe nada su valor serà un string vacìo
    const nombre=req.body.mokepon || ""
    const mokepon= new Mokepon(nombre)
    
    // const jugadorIndex= jugadores.findIndex((jugador)=> jugadorId==jugador.id)//comprobamos si el que manda la solicitud existe . el findindex arroja el indice del primer perosnaje que  satisfaga la condicion, y arroja -1 si ninguno coincide
    
    // if(jugadorIndex>=0) {// si existe
    //     jugadores[jugadorIndex].asignarMokepon(mokepon)
    // }  
    for(e of jugadores){ // revisamos si existe el id del que manda el req
        if(e.id==jugadorId){
            e.asignarMokepon(mokepon) // le asignamos el mokepon elegido 
        }
    }
    console.log(jugadores)    
    res.end()
})

app.post("/mokepon/:jugadorId/position", (req,res) => { // para saber que posicion tienen los jugadores en el mapa
    const jugadorId=req.params.jugadorId || ""
    const positionX=req.body.positionX || 0
    const positionY=req.body.positionY || 0
           
    for(e of jugadores){ // revisamos si existe el id del que manda el req
        if(e.id==jugadorId){
            e.actualizarPosition(positionX,positionY) // actualizamos posicion del mokepon en el mapa, el jug envia la corrdenada al server
        }
    }
    const listaEnemigos=jugadores.filter((jugador)=>jugadorId !== jugador.id) // creamos una lista de los jugadores que esten conectados, excepto el que mando la req
    console.log(jugadores)    
    res.send({  // el server responde con la lista de enemigos, sus id y sus coordenadas
        listaEnemigos
    }) 
})

// Activamos el servidor en el puerto 8080
app.listen(port, () => {
  console.log(`¡Servidor listo!`);
});