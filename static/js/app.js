let cont=true; // nos sirve para saber si el usuario ha elegido alguna opciòn ver linea 7
let vidasPC=3;
let vidasJug=3;
// const mokepones=["charizar","blastoise","sceptile","picachu","arcanine","golduck"]; //mokepones totalespara elegir
let ataquess=["Fuego🔥","Agua💧","Planta🌱","Rayo✨"]; // ataques existentes de todos los mokepones
let ataquesTotales;
let sectionMascota=document.getElementById("seleccionar-mascota");

let sectionAtaques=document.getElementById("seleccionar-ataque");
let sectionMensaje=document.getElementById("resultado");

let mokeponjug; //guarda el mokepon elegido por el jugador
let mokeponPc; // guarda el moke elegido porel enemigo
let ataqueActualJug; // nos dice el ataque elegido del jugador
let ataqueActualPc; // nos dice el ataque elegido del pc
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

let mostrarMokeponJug=document.getElementById("imagen-jugador"); //DIV de  mokepones elegidos por el jugador
let mostrarMokeponPc=document.getElementById("imagen-pc");//DIV de  mokepones elegidos por el pc

let mokepons=[];//aqui se almacenan los mokepones totales para elegir
let contenedorTarjetas=document.getElementById("contenedor-tarjetas")
let sectionContenedores=document.getElementById("contenedores");
let ataquesJug;
let ataquesPc;
let botones={};
let secuenciaAtaqueJug=[];  //secuencia Jug
let secuenciaAtaquePc=[];  //secuencia Pc
let contadorPuntosJug=0;    //para el combate
let contadorPuntosPc=0;

class Mokepon{    
    constructor(nombre,foto,vida){
        this.nombre=nombre;
        this.foto=foto;
        this.vida=vida;
        this.ataques=[];
    }
}


let charizar=new Mokepon("charizar",`./assets/charizar.png`,5);
let blastoise=new Mokepon("blastoise",`./assets/blastoise2.png`,5);
let sceptile=new Mokepon("sceptile",`./assets/sceptile.png`,5);
let picachu=new Mokepon("picachu",`./assets/picachu.png`,5);
let arcanine=new Mokepon("arcanine",`./assets/arcanine.png`,5);
let golduck=new Mokepon("golduck",`./assets/golduck.png`,5);

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

function extraerAtaquesTot(){ // para tener en un array los ataques totales del juego, nos servcira para hacer el cotejo en la funcion combate
    let ataquesDuplicados=[] // aqui se guardan todos los ataques, pero habrà mas de uno del mismo nombre
    for(x=0; x<mokepons.length; x++){
        for(i=0; i<5; i++){
        ataquesDuplicados.push(mokepons[x].ataques[i].id.split("boton-").slice(1).join()) // lo ultimo es para quitar el "boton-" del nombre que queremos guardar
        }
    }
    let comodin=new Set(ataquesDuplicados); // convertimos creamos un objeto de ataques sin duplicados
    ataquesTotales=[...comodin] //ahora convertimos en array nuestro conjunto sin duplicados
}

inciarJuego();

function selectMokepon(){        
    for (let e of mokepons){ // ya que es un typo radio, con la propiedad checked revisamos si esta en true o false , recorremos cada opción posible y mostramos la que este true
    if(document.getElementById(e.nombre).checked){
        cont=false;
        mokeponjug=e.nombre;         
        spanMokeJug.innerHTML=e.nombre; // modificamos el DOM        
        botonSelectMokepon.disabled=true;
        sectionMascota.style.display="none"// deshabilitamos la secciòn de seleccionar mokepon 
        selectMokeponPc(); // invocamos al enemigo
        return;
    }}
    if(cont) alert("Debes seleccionar algún Mokepón");            
}

function aleatorio(min,max){   // función para sacar numeros aleatorios entre un min y un max
    return Math.floor(Math.random()*(max-min +1) + min)
}

function selectMokeponPc(){    
    sectionAtaques.style.display="flex"// habilitamos la secciòn de seleccion ataque    
    sectionMensaje.style.display="block"// habilitamos la secciòn de mensajes
    mokeponPc=mokepons[aleatorio(0,mokepons.length-1)].nombre
    
    imagenMokeponJugadorVs(mokeponjug); //cargamos las imagenes del mokepon por el jugador Vs
    imagenMokeponPcVs(mokeponPc); //cargamos las imagenes del mokepon elegido por la PC Vs

    spanMokePc.innerHTML=mokeponPc; // modificamos el DOM de la eleccion del pc
    extraerAtaquesJug();
    extraerAtaquesPc();
    secuenciaAtaque();
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
    
    botones=document.querySelectorAll(".BDeataque");
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
    secuenciaDeAtaquePc();
    let contadorClicks=0; // cuando llega a 5 significa que ya uso los 5 botones y podemos invocar el combate
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if(e.target.textContent=="🔥"){
                secuenciaAtaqueJug.push("fuego")
                boton.style.background="#1D3E65";
                boton.disabled=true;                
                contadorClicks++;               
            } else if(e.target.textContent=="💧"){
                secuenciaAtaqueJug.push("agua")
                boton.style.background="#1D3E65"; 
                boton.disabled=true;
                contadorClicks++;
            } else if(e.target.textContent=="🌱"){
                secuenciaAtaqueJug.push("planta")
                boton.style.background="#1D3E65";
                boton.disabled=true;
                contadorClicks++; 
            }else if(e.target.textContent=="✨"){
                secuenciaAtaqueJug.push("rayo")
                boton.style.background="#1D3E65";
                boton.disabled=true;
                contadorClicks++; 
            }
            if(contadorClicks==5)  combate();   
        })
    });
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
    // 1 pto para el que gane cada duelo 

    for(i=0; i<secuenciaAtaqueJug.length; i++){
        if(secuenciaAtaqueJug[i]==ataquesTotales[0] && secuenciaAtaquePc[i]==ataquesTotales[2] || secuenciaAtaqueJug[i]==ataquesTotales[2] && secuenciaAtaquePc[i]==ataquesTotales[1] || secuenciaAtaqueJug[i]==ataquesTotales[3] && secuenciaAtaquePc[i]==ataquesTotales[1] || secuenciaAtaqueJug[i]==ataquesTotales[2] && secuenciaAtaquePc[i]==ataquesTotales[3]|| secuenciaAtaqueJug[i]==ataquesTotales[1] && secuenciaAtaquePc[i]==ataquesTotales[0]){
            console.log(`Tu pierdes😢, turno ${i+1}`);
            contadorPuntosPc++;            
            
        } else if(secuenciaAtaqueJug[i]==secuenciaAtaquePc[i]|| secuenciaAtaqueJug[i]==ataquesTotales[0] && secuenciaAtaquePc[i]==ataquesTotales[3] || secuenciaAtaqueJug[i]==ataquesTotales[3] && secuenciaAtaquePc[i]==ataquesTotales[0] ) {
            console.log(`Empate, turno ${i+1}`);
            
                       
        } else if(secuenciaAtaqueJug[i]==ataquesTotales[2] && secuenciaAtaquePc[i]==ataquesTotales[0] || secuenciaAtaqueJug[i]==ataquesTotales[1] && secuenciaAtaquePc[i]==ataquesTotales[2] || secuenciaAtaqueJug[i]==ataquesTotales[1] && secuenciaAtaquePc[i]==ataquesTotales[3] || secuenciaAtaqueJug[i]==ataquesTotales[3] && secuenciaAtaquePc[i]==ataquesTotales[2]|| secuenciaAtaqueJug[i]==ataquesTotales[0] && secuenciaAtaquePc[i]==ataquesTotales[1]) {
            console.log(`Tu ganas, turno ${i+1}`);
            contadorPuntosJug++;
        }
    }  
    contadorDepuntos(); 
}

function contadorDepuntos(){
    if(contadorPuntosJug>contadorPuntosPc){
        resulParcial=`Tu Ganas`;
        spanvidasJug.innerHTML=Number(spanvidasJug.innerText)-1;    
         //modifica el DOM con el nuevo numero de vidas del jug
        vidasJug=Number(spanvidasJug.innerText);
        if(vidasJug==0) {
            let mensaje=`GAME OVER! EL ${mokeponPc} ENEMIGO ES UN DIOS `
            crearMsjFinal(mensaje)        
      
        }
    } else if(contadorPuntosJug==contadorPuntosPc){
        resulParcial=`Es un empate`;
        
    } else {
        resulParcial=`Tu pierdes`;
        spanvidasPc.innerHTML=Number(spanvidasPc.innerText)-1; //modifica el DOM con el nuevo numero de vidas del PC
        vidasPC=Number(spanvidasPc.innerText);
        if(vidasPC==0) {
            let mensaje=`TU ${mokeponjug} HA GANADO EL DUELO!!!🥳🎉🥳`
            crearMsjFinal(mensaje)                          
        }
    }      
    crearMsj();
}

function crearMsj(){   
    let notificacion = document.createElement("p"); //creamos los elementos parrafo
    let nuevoAtaqueJugador = document.createElement("p")
    let nuevoAtaquePc = document.createElement("p");

    notificacion.innerHTML=resulParcial; //agregamos texto a los parrafos
    nuevoAtaqueJugador.innerHTML=ataqueActualJug;
    nuevoAtaquePc.innerHTML=ataqueActualPc;
    
    sectionMsj.appendChild(notificacion) //los cargamos en el HTML
    ataquesDelJugador.appendChild(nuevoAtaqueJugador)
    ataquesDelpc.appendChild(nuevoAtaquePc)
}

function crearMsjFinal(resultado){    
    let parrafo = document.createElement("p"); // creamos un H3 en HTML que nos da el mensaje de victoria o derrota dependeindo del combate
    parrafo.innerHTML=resultado;
    sectionMsjFinal.appendChild(parrafo) 

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

function inciarJuego(){ //para desactivar inicialmente lo que no queremos que se muestre y cargar las tarjetas de mokepones en el HTML    
    sectionAtaques.style.display="none"// deshabilitamos la secciòn de seleccion ataque
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
}

function reinciar(){
    location.reload();
}

function imagenMokeponJugadorVs(mokepon){ //muestra imagen del mokepon elegido por el jugador
    for(e of mokepons){
        if(mokepon==e.nombre){            
            let imagenMokeponJugador=new Image(280,280); //width, height
            imagenMokeponJugador.src=`./assets/${e.nombre}.png`
            console.log(imagenMokeponJugador.src)
            mostrarMokeponJug.appendChild(imagenMokeponJugador);                   
        }
    } 
}

function imagenMokeponPcVs(mokepon){ //muestra imagen del mokepon elegido por el PC
    for(e of mokepons){
        if(mokepon==e.nombre){            
            let imagenMokeponJugador=new Image(280,280); //width, height
            imagenMokeponJugador.src=`./assets/${e.nombre}.png`
            console.log(imagenMokeponJugador.src)
            mostrarMokeponPc.appendChild(imagenMokeponJugador);                   
        }
    } 
}


      



