// Importamos Express desde la carpeta node_modules
const express = require('express');
const cors=require("cors");


// Creamos la aplicación de Express
const app = express();

app.use(express.static("public")) // nos sirve para poder conectarnos desde el celu con wifi, ver el forntend desde el backend
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

    asignarAtaques(ataques){
        this.ataques=ataques
    }

    borrarAtaques(){
        this.ataques=[]
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

let round;
app.get('/unirse', (req, res) => {
    const id=`${Math.random()}` //le damos un numero random de identificacion al conectado

    const jugador=new Jugador(id);

    jugadores.push(jugador) // guardamos los datos del nuevo jugador
    
    res.setHeader("Access-Control-Allow-Origin", "*") // para corregir el error de origenes de servidor 

    res.status(200).send({ id, round });;
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
      
    res.send({  // el server responde con la lista de enemigos, sus id y sus coordenadas
        listaEnemigos
    }) 
})

app.post("/mokepon/:jugadorId/:round/ataques", (req,res)=> { // guarda la secuencia elegida por el jug 
    const jugadorId=req.params.jugadorId || ""
    const ataques=req.body.ataquesJug || []
    const round=req.params.round || 0 
        
    for(e of jugadores){ // revisamos si existe el id del que manda el req
        if(e.id==jugadorId){
            e.asignarAtaques(ataques) // asignamos la secuencia de ataque elejida por el jug
            console.log(e)
        }   
    }  
    
    
        
})

app.put("/mokepon/:jugadorId/:round/ataques", (req,res)=> { // guarda la secuencia elegida por el jug 
    const jugadorId=req.params.jugadorId || ""
    const ataques=req.body.ataquesJug || []
    console.log("put")
        
    for(e of jugadores){ // revisamos si existe el id del que manda el req
        if(e.id==jugadorId){            
            e.asignarAtaques(ataques) // asignamos la secuencia de ataque elejida por el jug
            console.log(e)
        }   
    }  
           
})

app.get("/mokepon/:jugadorId/:round/ataques", (req,res)=> { // para enviar los ataques elegidos por el enemigo
    const enemigoId=req.params.jugadorId || ""
    const round=req.params.jugadorId || 0
    const enemigo=jugadores.find(jugador=>jugador.id==enemigoId) // buscamos el que tiene el id de nuestro enemigo y lo guardamos en la variable enemigo
        
    res.send({ // responde con los ataques del jugador enemigo en formato json
        ataques: enemigo.ataques || []
        
    })
     
    for(e of jugadores){ // revisamos si existe el id del que manda el req
        if(e.id==enemigoId){
            e.borrarAtaques()
        }   
    } 
     
})

// app.put("/mokepon/:jugadorId/ataques",(req,res)=>{
//     const enemigoId=req.params.jugadorId || ""
//     const ataques=req.body.ataques
//     const enemigo=jugadores.find(jugador=>jugador.id==enemigoId) // buscamos el que tiene el id de nuestro enemigo y lo guardamos en la variable enemigo
//     for(e of jugadores){ // revisamos si existe el id del que manda el req
//         if(e.id==enemigoId){
//             e.asignarAtaques(ataques) // asignamos la secuencia de ataque elejida por el jug
//             console.log(e)
//         }   
//     } 
//     res.send({ // responde con los ataques del jugador enemigo en formato json
//         ataques: enemigo.ataques || []
//     })
    
// })


// Activamos el servidor en el puerto 8080
app.listen(port, () => {
  console.log(`¡Servidor listo!`);
});