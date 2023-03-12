let cont=true; // nos sirve para saber si el usuario ha elegido alguna opciòn ver linea 7
let vidasPC=3;
let vidasJug=3;

let ataquesTotales;
let sectionMascota=document.getElementById("seleccionar-mascota");

let sectionAtaques=document.getElementById("seleccionar-ataque");
let sectionMensaje=document.getElementById("resultado");

let mokeponjug; //guarda el mokepon elegido por el jugador
let mokeponPc; // guarda el moke elegido porel enemigo
let ataqueActualJug; // almacena el ataque correponsdiente a cada indice del array de la secuencia del jug
let ataqueActualPc; // almacena el ataque correponsdiente a cada indice del array de la secuencia del pc
let resulParcial;//guarda el resultado de cada enfrentamiento de cada combate
let spanMokeJug=document.getElementById("mokepon-jugador"); // para modificar el DOM
let spanMokePc=document.getElementById("mokepon-pc");
let spanvidasJug=document.getElementById("spanvidas-jugador");//para modificar el DOM en tiempo real
let spanvidasPc=document.getElementById("spanvidas-pc");

let botonSelectMokepon=document.getElementById("boton-mokepon");  // boton select mascota
botonSelectMokepon.addEventListener("click", selectMokepon);
let botonFuego;
let botonAgua;
let botonRayo;
let botonTierra;

let sectionMsj=document.getElementById("resultado");
let ataquesDelJugador=document.getElementById("ataques-del-jugador");
let ataquesDelpc=document.getElementById("ataques-del-pc");

let sectionMsjFinal=document.getElementById("mensaje-final");

let botonReiniciar=document.getElementById("boton-reiniciar");
botonReiniciar.addEventListener("click",reinciar);

let botonSigRonda=document.getElementById("boton-sig-ronda");
botonSigRonda.addEventListener("click",siguienteRonda)

let mostrarMokeponJug=document.getElementById("imagen-jugador"); //DIV de  mokepones elegidos por el jugador
let mostrarMokeponPc=document.getElementById("imagen-pc");//DIV de  mokepones elegidos por el pc

const sectionVerMapa=document.getElementById("ver-mapa");
const mapa=document.getElementById("mapa")
let lienzo=mapa.getContext("2d")
let mapaBackground= new Image();
mapaBackground.src="./assets/mokemap.png"

let mokepons=[];//aqui se almacenan los mokepones totales para elegir
let contenedorTarjetas=document.getElementById("contenedor-tarjetas")
let sectionContenedores=document.getElementById("contenedores");
let ataquesJug;
let ataquesPc;
let botonesAtaques={};
let secuenciaAtaqueJug=[];  //secuencia Jug
let secuenciaAtaquePc=[];  //secuencia Pc
let contadorPuntosJug=0;    //para el combate
let contadorPuntosPc=0;
let objetoMokeponJug; //guarda el objeto "mascota" elegido por el JUG
let objetoMokeponPc; //guarda el objeto "mascota" elegido por el pc

let jugadorId=null;
let enemigoId=null;

class Mokepon{
    constructor(nombre,foto,vida,x=35,y=420,id){
        this.nombre=nombre;
        this.foto=foto;
        this.vida=vida;
        this.ataques=[];
        this.x=x; // coordenadas para aparecer la imagen y poder mover
        this.y=y;
        this.ancho=75;
        this.alto=80;
        this.mapaFoto=new Image()
        this.mapaFoto.src=foto;
        this.velocidadX=0;
        this.velocidadY=0;
        this.id=id;
    }

    pintarMokeponJug(){ //metodo para pintar el mokepon en el canvas
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }

    pintarMokeponPc(){ //metodo para pintar el mokepon del enemigo en el canvas
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }

}

let charizar=new Mokepon("charizar",`./assets/charizar.png`,5);
let blastoise=new Mokepon("blastoise",`./assets/blastoise.png`,5);
let sceptile=new Mokepon("sceptile",`./assets/sceptile.png`,5);
let picachu=new Mokepon("picachu",`./assets/picachu.png`,5);
let arcanine=new Mokepon("arcanine",`./assets/arcanine.png`,5);
let golduck=new Mokepon("golduck",`./assets/golduck.png`,5);

let conjuntoEnemigos=[];
// let conjuntoEnemigosMapa=[];
//  let charizarPc=new Mokepon("charizar",`./assets/charizar.png`,5,580,30); // enemigos para ver en el mapa
//  let blastoisePc=new Mokepon("blastoise",`./assets/blastoise.png`,5,580,100);
//  let sceptilePc=new Mokepon("sceptile",`./assets/sceptile.png`,5,580,200);
//  let picachuPc=new Mokepon("picachu",`./assets/picachu.png`,5,400,30);
//  let arcaninePc=new Mokepon("arcanine",`./assets/arcanine.png`,5,400,100);
//  let golduckPc=new Mokepon("golduck",`./assets/golduck.png`,5,400,200);
//  conjuntoEnemigosMapa.push(charizarPc,blastoisePc,sceptilePc,picachuPc,arcaninePc,golduckPc)


charizar.ataques.push(
    {nombre:`🔥`, id:"boton-fuego"},
    {nombre:`🔥`, id:"boton-fuego"},
    {nombre:`🔥`, id:"boton-fuego"},
    {nombre:`🔥`, id:"boton-fuego"},
    {nombre:`🌱`, id:"boton-planta"}
)

blastoise.ataques.push(
    {nombre:`💧`, id:"boton-agua"},
    {nombre:`💧`, id:"boton-agua"},
    {nombre:`💧`, id:"boton-agua"},
    {nombre:`💧`, id:"boton-agua"},
    {nombre:`🌱`, id:"boton-planta"}
)

sceptile.ataques.push(
    {nombre:`🌱`, id:"boton-planta"},
    {nombre:`🌱`, id:"boton-planta"},
    {nombre:`🌱`, id:"boton-planta"},
    {nombre:`🌱`, id:"boton-planta"},
    {nombre:`✨`, id:"boton-rayo"}
)

picachu.ataques.push(
    {nombre:`✨`, id:"boton-rayo"},
    {nombre:`✨`, id:"boton-rayo"},
    {nombre:`✨`, id:"boton-rayo"},
    {nombre:`✨`, id:"boton-rayo"},
    {nombre:`🌱`, id:"boton-planta"}
)

arcanine.ataques.push(
    {nombre:`🔥`, id:"boton-fuego"},
    {nombre:`🔥`, id:"boton-fuego"},
    {nombre:`🔥`, id:"boton-fuego"},
    {nombre:`🌱`, id:"boton-planta"},
    {nombre:`🌱`, id:"boton-planta"}
)

golduck.ataques.push(
    {nombre:`💧`, id:"boton-agua"},
    {nombre:`💧`, id:"boton-agua"},
    {nombre:`💧`, id:"boton-agua"},
    {nombre:`✨`, id:"boton-rayo"},
    {nombre:`✨`, id:"boton-rayo"}
)

mokepons.push(charizar,blastoise,sceptile,picachu,arcanine,golduck)

function extraerAtaquesTot(){ // para tener en un array los ataques totales del juego, nos servira para hacer el cotejo en la funcion combate
    let ataquesDuplicados=[] // aqui se guardan todos los ataques, pero habrà mas de uno del mismo nombre
    for(x=0; x<mokepons.length; x++){
        for(i=0; i<5; i++){
        ataquesDuplicados.push(mokepons[x].ataques[i].id.split("boton-").slice(1).join()) // lo ultimo es para quitar el "boton-" del nombre que queremos guardar
        }
    }
    let comodin=new Set(ataquesDuplicados); // convertimos creamos un objeto de ataques sin duplicados
    ataquesTotales=[...comodin] //ahora convertimos en array nuestro conjunto sin duplicados
}

iniciarJuego();

function selectMokepon(){

    for (let e of mokepons){ // ya que es un typo radio, con la propiedad checked revisamos si esta en true o false , recorremos cada opción posible y mostramos la que este true
        objetoMokeponJug=e; //guardamos el objeto completo del mokepon elegido
        if(document.getElementById(e.nombre).checked){
            cont=false;
            mokeponjug=e.nombre;
            spanMokeJug.innerHTML=e.nombre; // modificamos el DOM
            botonSelectMokepon.disabled=true;
            sectionMascota.style.display="none"// deshabilitamos la secciòn de seleccionar mokepon
            selectMokeponPc(); // invocamos al enemigo
            seleccionarMokepon(mokeponjug);
            return;
    }}
    if(cont) alert("Debes seleccionar algún Mokepón");

}

function seleccionarMokepon(mokeponDelJug){ //parte servidor
    fetch(`http://192.168.1.140:8080/mokepon/${jugadorId}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            mokepon:mokeponDelJug
        })
    })
        
}

function aleatorio(min,max){   // función para sacar numeros aleatorios entre un min y un max
    return Math.floor(Math.random()*(max-min +1) + min)
}

function selectMokeponPc(mokepon){
    if(mokepon==undefined){
        sectionVerMapa.style.display="flex";
        iniciarMapa();
        // let indiceAleatorio=aleatorio(0,mokepons.length-1)
        // sectionMensaje.style.display="block"// habilitamos la secciòn de mensajes
        // mokeponPc=mokepons[indiceAleatorio].nombre
        // objetoMokeponPc=mokepons[indiceAleatorio]

        // imagenMokeponJugadorVs(); //cargamos las imagenes del mokepon por el jugador Vs
        // imagenMokeponPcVs(); //cargamos las imagenes del mokepon elegido por la PC Vs

        // spanMokePc.innerHTML=mokeponPc; // modificamos el DOM de la eleccion del pc
        // extraerAtaquesJug();
        // extraerAtaquesPc();
        // secuenciaAtaque();
    }   else {
        sectionMensaje.style.display="block"// habilitamos la secciòn de mensajes
        mokeponPc=mokepon.nombre;
        objetoMokeponPc=mokepon

        imagenMokeponJugadorVs(); //cargamos las imagenes del mokepon por el jugador Vs
        imagenMokeponPcVs(); //cargamos las imagenes del mokepon elegido por la PC Vs

        spanMokePc.innerHTML=mokeponPc; // modificamos el DOM de la eleccion del pc
        extraerAtaquesJug();
        extraerAtaquesPc();
        secuenciaAtaque();
    }

}

let idAtaquesJug=[] // guardo los id (id de los botones) de los ataques del mokepone elegido por el jugador
let arrayAtaquesPc=[] // guardo los id (nombres) de los ataques del mokepone elegido por el pc

function extraerAtaquesJug(){ // para guardar en la variable ataquesJug los ataques que corresponden al mokepon elegido por el jug  y mostrar en HTML los botones de ataque
    for(e of mokepons ){
        if(mokeponjug==e.nombre) ataquesJug=e.ataques;
    }

    ataquesJug.forEach(ataque=> {
        let opcionesDeAtaques=`<button class="botones-ataque BDeataque" id=${ataque.id}>${ataque.nombre}</button>`;
        let botonesDeAtaques=document.getElementById("botones-de-ataque");
        botonesDeAtaques.innerHTML+=opcionesDeAtaques;
        idAtaquesJug.push(ataque.id)
    });

    botonesAtaques=document.querySelectorAll(".BDeataque");
    // cuando hacen click en los botones de ataque
    if(idAtaquesJug.indexOf("boton-fuego")>=0) { // si nuestro mokepon tiene este ataque enntra el If
        botonFuego=document.getElementById("boton-fuego");
        // botonFuego.addEventListener("click", atackFuego );
    }

    if(idAtaquesJug.indexOf("boton-agua")>=0){
        botonAgua=document.getElementById("boton-agua");
        // botonAgua.addEventListener("click", atackAgua);
    }

    if(idAtaquesJug.indexOf("boton-tierra")>=0){
        botonTierra=document.getElementById("boton-tierra");
        // botonTierra.addEventListener("click",atackTierra );
    }

    if(idAtaquesJug.indexOf("boton-rayo")>=0){
        botonRayo=document.getElementById("boton-rayo")
        // botonRayo.addEventListener("click", atackRayo);
    }
}

function extraerAtaquesPc(){ // para guardar en la variable ataquesPc los ataques que corresponden al mokepon elegido por el pc
    for(e of mokepons ){
        if(mokeponPc==e.nombre) {
        ataquesPc=e.ataques;
    }
    }

    for(ataque of ataquesPc){ //guardo en la variable los nombres de los ataques del mokepon del pc
        arrayAtaquesPc.push(ataque.id.split("boton-").slice(1).join()); // guardamos solo el nombre del ataque, quitando el texto "boton-" ya que el id viene "boton-fuego" por ejemplo.

    }
}

function secuenciaAtaque(){ //secuencia de ataques del jugador
    // secuenciaDeAtaquePc();
    botonesAtaques.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if(e.target.textContent=="🔥"){
                secuenciaAtaqueJug.push("fuego")
                boton.style.background="#1D3E65";
                boton.disabled=true;

            } else if(e.target.textContent=="💧"){
                secuenciaAtaqueJug.push("agua")
                boton.style.background="#1D3E65";
                boton.disabled=true;

            } else if(e.target.textContent=="🌱"){
                secuenciaAtaqueJug.push("planta")
                boton.style.background="#1D3E65";
                boton.disabled=true;

            }else if(e.target.textContent=="✨"){
                secuenciaAtaqueJug.push("rayo")
                boton.style.background="#1D3E65";
                boton.disabled=true;

            }
            if(secuenciaAtaqueJug.length==5){
                console.log("envio")                
                enviarAtaquesServer();
                
            } 
        })
    });
}
let comodin=true
function enviarAtaquesServer(){
    if(comodin){
        // comodin=false
        fetch(`http://192.168.1.140:8080/mokepon/${jugadorId}/ataques`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                ataquesJug:secuenciaAtaqueJug
            })
        })
        
    // } else {
    //     fetch(`http://192.168.1.140:8080/mokepon/${jugadorId}/ataques`,{
    //         method:"PUT",
    //         headers:{
    //             "Content-Type":"application/json"
    //         },
    //         body: JSON.stringify({
    //             ataquesJug:secuenciaAtaqueJug
    //         })
    //     })
    // }
    intervalo=setInterval(recibirAtaques,50) // cada 50 ms revisamos si ya obtuvimos la secuencia de ataques del oponente
}
}
function recibirAtaques(){
    fetch(`http://192.168.1.140:8080/mokepon/${enemigoId}/ataques`)
        .then (function(res){ // primero revisamos si la peticion obtuvo respuesta del server
            if(res.ok){ //res viene como una lista que contiene la secuencia de ataques del oponente 
                res.json() //para leer su respuesta debemos usar then
                    .then(function({ataques}){ // //con las llaves directamente es como si hicieramos respuesta.ataques
                        console.log(ataques)
                        if(ataques.length==5){ // hasta que complete la secuecia
                            secuenciaAtaquePc=ataques; // asignamos la lista que el server nos devuelve
                            combate();                          
                                              
                    }
                })
            }})
}

function secuenciaDeAtaquePc(){ //secuencia de ataques aleatorio del PC
    let n=arrayAtaquesPc.length; // guardamos el numero de ataques maximos del pc
    let indiceAleatorio;
    for(i=0; i<n; i++){
        indiceAleatorio=aleatorio(0,arrayAtaquesPc.length-1);
        secuenciaAtaquePc.push(arrayAtaquesPc[indiceAleatorio]); // pusheamos el arreglo de la secuencia del pc
        arrayAtaquesPc.splice(indiceAleatorio,1) //eliminamos del array el valor del indice aleatorio escogido, para que no pueda ser elegida de nuevo
    }
    console.log(secuenciaAtaquePc)

}

function combate(){

    clearInterval(intervalo)//para que deje de ejecutarse

    // 1 pto para el que gane cada duelo

    for(i=0; i<secuenciaAtaqueJug.length; i++){
        ataquesEnfrentados(i,i); // para extraer los ataques de jug y pc enfrentados en cada ronda
        if(secuenciaAtaqueJug[i]==ataquesTotales[0] && secuenciaAtaquePc[i]==ataquesTotales[2] || secuenciaAtaqueJug[i]==ataquesTotales[2] && secuenciaAtaquePc[i]==ataquesTotales[1] || secuenciaAtaqueJug[i]==ataquesTotales[3] && secuenciaAtaquePc[i]==ataquesTotales[1] || secuenciaAtaqueJug[i]==ataquesTotales[2] && secuenciaAtaquePc[i]==ataquesTotales[3]|| secuenciaAtaqueJug[i]==ataquesTotales[1] && secuenciaAtaquePc[i]==ataquesTotales[0]){
            console.log(`Tu pierdes😢, turno ${i+1}`);
            contadorPuntosPc++;

        } else if(secuenciaAtaqueJug[i]==secuenciaAtaquePc[i]|| secuenciaAtaqueJug[i]==ataquesTotales[0] && secuenciaAtaquePc[i]==ataquesTotales[3] || secuenciaAtaqueJug[i]==ataquesTotales[3] && secuenciaAtaquePc[i]==ataquesTotales[0] ) {
            console.log(`Empate, turno ${i+1}`);


        } else if(secuenciaAtaqueJug[i]==ataquesTotales[2] && secuenciaAtaquePc[i]==ataquesTotales[0] || secuenciaAtaqueJug[i]==ataquesTotales[1] && secuenciaAtaquePc[i]==ataquesTotales[2] || secuenciaAtaqueJug[i]==ataquesTotales[1] && secuenciaAtaquePc[i]==ataquesTotales[3] || secuenciaAtaqueJug[i]==ataquesTotales[3] && secuenciaAtaquePc[i]==ataquesTotales[2]|| secuenciaAtaqueJug[i]==ataquesTotales[0] && secuenciaAtaquePc[i]==ataquesTotales[1]) {
            console.log(`Tu ganas, turno ${i+1}`);
            contadorPuntosJug++;
        }
        crearMsj1();
    }
    contadorDepuntos();
}

let turno=0; //para mostrar en pantalla el turno que va

function contadorDepuntos(){
    if(contadorPuntosJug>contadorPuntosPc){
        turno++;
        resulParcial=`Ronda: ${turno}, Tu Ganas`;
        spanvidasPc.innerHTML=Number(spanvidasPc.innerText)-1;
         //modifica el DOM con el nuevo numero de vidas del pc
        vidasPC=Number(spanvidasPc.innerText);
        if(vidasPC==0) {
            let mensaje=`TU ${mokeponjug} HA GANADO EL DUELO!!!🥳🎉🥳`
            crearMsjFinal(mensaje)

        }
    } else if(contadorPuntosJug==contadorPuntosPc){
        turno++;
        resulParcial=`Ronda: ${turno}, Es un empate`;

    } else {
        turno++;
        resulParcial=`Ronda: ${turno},Tu pierdes`;
        spanvidasJug.innerHTML=Number(spanvidasJug.innerText)-1; //modifica el DOM con el nuevo numero de vidas del jug
        vidasJug=Number(spanvidasJug.innerText);
        if(vidasJug==0) {
            let mensaje=`GAME OVER! EL ${mokeponPc} ENEMIGO ES UN DIOS `
            crearMsjFinal(mensaje)
        }
    }
    crearMsj2();
}

function ataquesEnfrentados(indiceJug,indicePc){ // para guardar en variables cada Vs de los ataques enfrentados cada ronda
    ataqueActualJug=secuenciaAtaqueJug[indiceJug];
    ataqueActualPc=secuenciaAtaquePc[indicePc];
}

function crearMsj1(){    //mensaje inferior de la pantalla
    let nuevoAtaqueJugador = document.createElement("p")//creamos los elementos parrafo
    let nuevoAtaquePc = document.createElement("p");

    nuevoAtaqueJugador.innerHTML=ataqueActualJug;//agregamos texto a los parrafos
    nuevoAtaquePc.innerHTML=ataqueActualPc;

    ataquesDelJugador.appendChild(nuevoAtaqueJugador)//los cargamos en el HTML
    ataquesDelpc.appendChild(nuevoAtaquePc)
}

function crearMsj2(){  //mensaje superior de si ganamos o perdimos la ronda
    let notificacion = document.createElement("p"); //creamos los elementos parrafo

    notificacion.innerHTML=resulParcial; //agregamos texto a los parrafos

    sectionMsj.appendChild(notificacion) //los cargamos en el HTML
}

function crearMsjFinal(resultado){    //resultado final
    let parrafo = document.createElement("p"); // creamos un H3 en HTML que nos da el mensaje de victoria o derrota dependeindo del combate
    parrafo.innerHTML=resultado;
    sectionMsjFinal.appendChild(parrafo)

    //deshabilitar boton de siguiente ronda
    botonSigRonda.disabled=true;

    // deshabilitar botones de ataques
    if(idAtaquesJug.indexOf("boton-fuego")>=0) { // si nuestro mokepon tiene este ataque enntra el If
        botonFuego.disabled=true;
    }

    if(idAtaquesJug.indexOf("boton-agua")>=0){
        botonAgua.disabled=true;
    }

    if(idAtaquesJug.indexOf("boton-tierra")>=0){
        botonTierra.disabled=true;
    }

    if(idAtaquesJug.indexOf("boton-rayo")>=0){
        botonRayo.disabled=true;
    }
}

function iniciarJuego(){ //para desactivar inicialmente lo que no queremos que se muestre y cargar las tarjetas de mokepones en el HTML
    sectionAtaques.style.display="none"// deshabilitamos la secciòn de seleccion ataque
    sectionVerMapa.style.display="none"  // deshabilitamos el mapa
    let contador=0; // para revisar si llevamos 3 mokepones y organizarlos en un Div inferior en pantalla
    mokepons.forEach((mokepon,indice) => {
        let opcionDeMokepones=`
        <input type="radio" id=${mokepon.nombre} name="mokepon">
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre} >
            <p>${mokepon.nombre} </p>
            <img src=${mokepon.foto}  alt=${mokepon.nombre} >

        </label>`

        if((indice+1)%4==0){
            contador++;    // para darle un Id diferente a cada DIV
            let nuevoDiv=document.createElement("div");
            nuevoDiv.id=`contenedor-${contador}`;
            nuevoDiv.className="tarjetas"
            sectionContenedores.appendChild(nuevoDiv)
            contenedorTarjetas=document.getElementById(`contenedor-${contador}`)
            contenedorTarjetas.innerHTML+=opcionDeMokepones;
        } else contenedorTarjetas.innerHTML+=opcionDeMokepones;

    })
    extraerAtaquesTot()
    unirseAlJuego();
}

function unirseAlJuego(){ //peticion hacia el servidor
    fetch("http://192.168.1.140:8080/unirse") //indicamos a donde se debe conectar (por defecto llama al metodo GET)
        .then(function (res) {            
            if(res.ok) {//si hay datos de respuesta
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugadorId=respuesta
                    })
            }
        })
      
}

function reinciar(){
    location.reload();
}



function siguienteRonda(){

    secuenciaAtaqueJug=[];
    secuenciaAtaquePc=[];    
    // extraerAtaquesPc() // se debe llamar porque el split le borra el contenido a la hora de elegir
    // secuenciaDeAtaquePc(); // el pc vuelve a elegir secuencia
    botonesAtaques.forEach(boton =>{
        boton.disabled=false;
        boton.style.backgroundColor="white";
    })
    

}

function imagenMokeponJugadorVs(){ //muestra imagen del mokepon elegido por el jugador
    let imagenMokeponJugador=new Image(280,280); //width, height
    imagenMokeponJugador.src=`./assets/${objetoMokeponJug.nombre}.png`
    mostrarMokeponJug.appendChild(imagenMokeponJugador);

}

function imagenMokeponPcVs(){ //muestra imagen del mokepon elegido por el PC
    let imagenMokeponPc=new Image(280,280); //width, height
    imagenMokeponPc.src=`./assets/${objetoMokeponPc.nombre}.png`
    mostrarMokeponPc.appendChild(imagenMokeponPc);
}

let intervalo; //interval sirve para llamar una funcion varias veces de forma continua en intervalos de tiempo

function pintarCanvas(){
    objetoMokeponJug.x+=objetoMokeponJug.velocidadX;
    objetoMokeponJug.y+=objetoMokeponJug.velocidadY;
    // for(e of conjuntoEnemigosMapa){ 
    //     if(e.x + e.velocidadX > mapa.width-e.ancho || e.x <0){ //delimitamos que solo se puedan mover los enemigos dentro del canvas wn X
    //         e.velocidadX= -e.velocidadX             
    //     }
    //     if(e.y + e.velocidadY > mapa.height-e.alto || e.y <0){ //delimitamos que solo se puedan mover los enemigos dentro del canvas en Y
    //         e.velocidadY= -e.velocidadY            
    //     }
    //     e.x+=e.velocidadX
    //     e.y+=e.velocidadY
    // }
    
    lienzo.clearRect(0, 0, mapa.width,mapa.height)  //limpia pantalla de frames anteriores al movimiento nuevo
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    if(objetoMokeponJug.x>mapa.width-objetoMokeponJug.ancho){  // delimitamos mov dentro del canvas
        objetoMokeponJug.x=mapa.width-objetoMokeponJug.ancho+1
    }
    if(objetoMokeponJug.y>mapa.height-objetoMokeponJug.alto){
        objetoMokeponJug.y=mapa.height-objetoMokeponJug.alto+1
    }
    if(objetoMokeponJug.x<0){
        objetoMokeponJug.x=1;           
    }
    if(objetoMokeponJug.y<0){
        objetoMokeponJug.y=1;           
    }

    

    objetoMokeponJug.pintarMokeponJug();
    // objetoMokeponPc.pintarMokeponPc(); pinta el aleatorio elegido por el pc
            
    // for(e of conjuntoEnemigosMapa){ // pinta todos los mokepones pc en el mapa
    //     e.pintarMokeponPc();
        
    // }   

    
    conjuntoEnemigos.forEach((enemigo)=>{ // pintamos en mapa los enemigos online
        if(enemigo){ // solo si existe un enemigo online!
            enemigo.pintarMokeponJug()                                    
        }
    })
    
   
    enviarPosition(objetoMokeponJug.x,objetoMokeponJug.y) //lado server

    
    conjuntoEnemigos.forEach((enemigo)=>{
        if(enemigo){ // solo si existe un enemigo online!
            revisarColision(enemigo)
           
        }
    })
    
    if(objetoMokeponJug.velocidadX !==0 ||
        objetoMokeponJug.velocidadY!==0
        ){
        // revisarColision(objetoMokcheponPc);   // el elegido por el pc
        // revisarColision(charizarPc)
        // revisarColision(blastoisePc)
        // revisarColision(sceptilePc)
        // revisarColision(picachuPc)
        // revisarColision(arcaninePc)
        // revisarColision(golduckPc)


    }
}


function enviarPosition(x,y){ //parte servidor
    fetch(`http://192.168.1.140:8080/mokepon/${jugadorId}/position`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            positionX:x,
            positionY:y
        })
    })
        .then (function(res){ // primero revisamos si la peticion obtuvo respuesta del server
        if(res.ok){
            res.json() //para leer su respuesta debemos usar then
                .then(function({listaEnemigos}){//con las llaves directamente es como si hicieramos repuesta.listaEnemigos
                    
                    conjuntoEnemigos= listaEnemigos.map((enemigo)=>{ //el map retorna un elemento 
                        if(enemigo.mokepon){ // para evitar errores de lista vacia
                        const mokeponEnemigoNombre= enemigo.mokepon.nombre || "" 
                        let enemigoOnline=new Mokepon(`${mokeponEnemigoNombre}`,`./assets/${mokeponEnemigoNombre}.png`,5,enemigo.x,enemigo.y,enemigo.id); // creamos los mokepons elejidos por los otros jug online
                        return enemigoOnline;
                    }           
                    })
                })

        }
    }) 
        
}
let botonesMov={}

function moverMokepon(){
    botonesMov=document.querySelectorAll(".bMov"); // guardamos en variable todos los elementos de la clase botones de movimiento
    botonesMov.forEach((boton) => {
        boton.addEventListener("mousedown", (e) => {
            if(e.target.textContent=="🢁"){
                objetoMokeponJug.velocidadY-=5
            }
            if(e.target.textContent=="🢃"){
                objetoMokeponJug.velocidadY+=5
            }
            if(e.target.textContent=="◀" && objetoMokeponJug.x>0){
                objetoMokeponJug.velocidadX-=5
            }
            if(e.target.textContent=="➤"){
                objetoMokeponJug.velocidadX+=5
            }
        })
    })
}


// function moverMokeponesPc(){
//     for (e of conjuntoEnemigosMapa){
//         let velocidadAleatoria=aleatorio(-2,2)   
//         e.velocidadX+=velocidadAleatoria*4+2;// graduamos velocidad deseada y sumamos 1 para que nunca sea cero
//         e.velocidadY+=velocidadAleatoria*4+2;       
//     }  
// }

function detenerMov(){
    objetoMokeponJug.velocidadX=0;
    objetoMokeponJug.velocidadY=0;
}

function detenerMovTeclado(event){
    objetoMokeponJug.velocidadX=0;
    objetoMokeponJug.velocidadY=0;
    keyspressed[event.key]=false;
}

let keyspressed={} // almacenarà teclas presionadas, esto para captar cuando el usuario presiona dos mov al mismo tiempo

function presionandoTeclado(event){ // todos los eventlistener devuelven el evento de lo presionado
    objetoMokeponJug.velocidadX=0; //para que no se sumen las velocidades cada que se presiona otro boton
    objetoMokeponJug.velocidadY=0;
    keyspressed[event.key]=true;
    switch (event.key) {
        case "ArrowUp":
        case "w":
            objetoMokeponJug.velocidadY-=7 
        break;
        case "ArrowDown":
        case "s":
            objetoMokeponJug.velocidadY+=7
        break;
        case "ArrowLeft":
        case "a":
            objetoMokeponJug.velocidadX-=7
        break;
        case "ArrowRight":
        case "d":
            objetoMokeponJug.velocidadX+=7
        break;
    }

    if(keyspressed["ArrowUp"] && keyspressed["ArrowRight"]){
        objetoMokeponJug.velocidadY-=2.5;
        objetoMokeponJug.velocidadX+=2.5
    }
    else if(keyspressed["ArrowUp"] && keyspressed["ArrowLeft"]){
        objetoMokeponJug.velocidadY-=2.5;
        objetoMokeponJug.velocidadX-=2.5
    }
    else if(keyspressed["ArrowDown"] && keyspressed["ArrowLeft"]){
        objetoMokeponJug.velocidadY+=2.5;
        objetoMokeponJug.velocidadX-=2.5
    }
    else if(keyspressed["ArrowDown"] && keyspressed["ArrowRight"]){
        objetoMokeponJug.velocidadY+=2.5;
        objetoMokeponJug.velocidadX+=2.5
    }

}

function revisarColision(enemigo){
    const arribaPc=enemigo.y +25; // se le suma 25 para restar un poco el cuadro y no se empiecen a chocar desde antes que las imagenes se toquen realmente
    const abajoPc=enemigo.y + enemigo.alto -25;
    const derechaPc=enemigo.x +enemigo.ancho -25;
    const izquierdaPc=enemigo.x + 25;

    const arribaJug=objetoMokeponJug.y;
    const abajoJug=objetoMokeponJug.y + objetoMokeponJug.alto;
    const derechaJug=objetoMokeponJug.x +objetoMokeponJug.ancho;
    const izquierdaJug=objetoMokeponJug.x;

    if(abajoJug<arribaPc ||
        arribaJug>abajoPc ||
        derechaJug < izquierdaPc ||
        izquierdaJug>derechaPc
    ){
        return
    } else {
        detenerMov();
        clearInterval(intervalo); // para que deje de ejecutarse el pintar canvas
        window.removeEventListener("keydown",presionandoTeclado,true) // deshabilitamos el evento de escuchar el teclado, para que no se nos mueva en segundo plano cuando presionemos una tecla
        enemigoId=enemigo.id;
        selectMokeponPc(enemigo)
        sectionAtaques.style.display="flex"// habilitamos la secciòn de seleccion ataque
        sectionVerMapa.style.display="none" // deshabilitamos el canvas

    }

}

function iniciarMapa(){
    mapa.width=800
    mapa.height=500
    intervalo=setInterval(pintarCanvas,50) // para que nuestro canvas se este actualizando ocnstantemente y asi ver el movimiento, llama casa 50 ms la funcion pintarNokepon
    moverMokepon();
    // moverMokeponesPc();
    window.addEventListener("keydown", presionandoTeclado,true) // deja presionada un atecla
    window.addEventListener("keyup", detenerMovTeclado)    // deja de presionarla
}
