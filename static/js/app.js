let cont=true; // nos sirve para saber si el usuario ha elegido alguna opciòn ver linea 7
let vidasPC=3;
let vidasJug=3;
const mokepones=["charizar","blastoise","sceptile","picachu","arcanine","golduck"]; //mokepones totalespara elegir
const elementos={"charizar":"Fuego🔥", "blastoise":"Agua💧","sceptile":"Planta 🌱","picachu":"Rayo✨","arcanine":"Fuego🔥 + Planta🌱","golduck":"Agua💧 + Rayo✨" } //elementos de cada mokepon
const ataques=["Fuego🔥","Agua💧","Planta🌱","Rayo✨"]; // ataques existentes

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
let botonFuego=document.getElementById("boton-fuego");  //botones de ataques
botonFuego.addEventListener("click", atackFuego );
let botonAgua=document.getElementById("boton-agua");
botonAgua.addEventListener("click", atackAgua);
let botonTierra=document.getElementById("boton-tierra");
botonTierra.addEventListener("click",atackTierra );
let botonRayo=document.getElementById("boton-rayo")
botonRayo.addEventListener("click", atackRayo);

let sectionMsj=document.getElementById("resultado");
let ataquesDelJugador=document.getElementById("ataques-del-jugador");
let ataquesDelpc=document.getElementById("ataques-del-pc");

let sectionMsjFinal=document.getElementById("mensaje-final");

let botonReiniciar=document.getElementById("boton-reiniciar");
botonReiniciar.addEventListener("click",reinciar);

let mostrarMokeponJug=document.getElementById("imagen-jugador"); //DIV de  mokepones elegidos por el jugador
let mostrarMokeponPc=document.getElementById("imagen-pc");//DIV de  mokepones elegidos por el pc

let mokepons=[];
let contenedorTarjetas=document.getElementById("contenedor-tarjetas")
let sectionContenedores=document.getElementById("contenedores");

class Mokepon{    
    constructor(nombre,foto,vida){
        this.nombre=nombre;
        this.foto=foto;
        this.vida=vida;
        this.ataque=[];
    }
}

let charizar=new Mokepon("charizar",`./assets/charizar.png`,5);
let blastoise=new Mokepon("blastoise",`./assets/blastoise.png`,5);
let sceptile=new Mokepon("sceptile",`./assets/sceptile.png`,5);
let picachu=new Mokepon("picachu",`./assets/picachu.png`,5);
let arcanine=new Mokepon("arcanine",`./assets/arcanine.png`,5);
let golduck=new Mokepon("golduck",`./assets/golduck.png`,5);

charizar.ataque.push(
    {nombre:`🔥`, id:"boton-fuego"},
    {nombre:`🔥`, id:"boton-fuego"},
    {nombre:`🔥`, id:"boton-fuego"},
    {nombre:`🔥`, id:"boton-fuego"},
    {nombre:`🌱`, id:"boton-tierra"}
)

blastoise.ataque.push(
    {nombre:`💧`, id:"boton-agua"},
    {nombre:`💧`, id:"boton-agua"},
    {nombre:`💧`, id:"boton-agua"},
    {nombre:`💧`, id:"boton-agua"},
    {nombre:`🌱`, id:"boton-tierra"}
)

sceptile.ataque.push(
    {nombre:`🌱`, id:"boton-tierra"},
    {nombre:`🌱`, id:"boton-tierra"},
    {nombre:`🌱`, id:"boton-tierra"},
    {nombre:`🌱`, id:"boton-tierra"},
    {nombre:`✨`, id:"boton-rayo"}
)

picachu.ataque.push(
    {nombre:`✨`, id:"boton-rayo"},
    {nombre:`✨`, id:"boton-rayo"},
    {nombre:`✨`, id:"boton-rayo"},
    {nombre:`✨`, id:"boton-rayo"},
    {nombre:`🌱`, id:"boton-tierra"}
)

arcanine.ataque.push(
    {nombre:`🔥`, id:"boton-fuego"},
    {nombre:`🔥`, id:"boton-fuego"},
    {nombre:`🔥`, id:"boton-fuego"},
    {nombre:`🌱`, id:"boton-tierra"},
    {nombre:`🌱`, id:"boton-tierra"}
)

golduck.ataque.push(
    {nombre:`💧`, id:"boton-agua"},
    {nombre:`💧`, id:"boton-agua"},
    {nombre:`💧`, id:"boton-agua"},
    {nombre:`✨`, id:"boton-rayo"},
    {nombre:`✨`, id:"boton-rayo"}
)

mokepons.push(charizar,blastoise,sceptile,picachu,arcanine,golduck)

inciarJuego();

function selectMokepon(){        
    for (let e of mokepones){ // ya que es un typo radio, con la propiedad checked revisamos si esta en true o false , recorremos cada opción posible y mostramos la que este true
    if(document.getElementById(e).checked){
        cont=false;
        mokeponjug=e;         
        spanMokeJug.innerHTML=e; // modificamos el DOM        
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
    mokeponPc=mokepones[aleatorio(0,mokepones.length-1)]
    
    imagenMokeponJugadorVs(mokeponjug); //cargamos las imagenes del mokepon por el jugador Vs
    imagenMokeponPcVs(mokeponPc); //cargamos las imagenes del mokepon elegido por la PC Vs

    spanMokePc.innerHTML=mokeponPc; // modificamos el DOM de la eleccion del pc
}

function atackFuego(){ //ataques jugador
  ataqueActualJug=ataques[0];
  atackPc();  
}

function atackAgua(){
    ataqueActualJug=ataques[1];
    atackPc(); 
}

function atackTierra(){
    ataqueActualJug=ataques[2]; 
    atackPc();
}

function atackRayo(){
    ataqueActualJug=ataques[3]; 
    atackPc();
}

function atackPc(){ //ataque aleatorio del PC
    ataqueActualPc=ataques[aleatorio(0,ataques.length-1)];
    combate();
}

function combate(){        
    if(ataqueActualJug==ataques[0] && ataqueActualPc==ataques[1] || ataqueActualJug==ataques[1] && ataqueActualPc==ataques[2] || ataqueActualJug==ataques[3] && ataqueActualPc==ataques[2] || ataqueActualJug==ataques[1] && ataqueActualPc==ataques[3]|| ataqueActualJug==ataques[2] && ataqueActualPc==ataques[0]){
        resulParcial="Tu pierdes😢";
        
        spanvidasJug.innerHTML=Number(spanvidasJug.innerText)-1;    
         //modifica el DOM con el nuevo numero de vidas del jug
        vidasJug=Number(spanvidasJug.innerText);
        if(vidasJug==0) {
            let mensaje=`GAME OVER! EL ${mokeponPc} ENEMIGO ES UN DIOS `
            crearMsjFinal(mensaje)        
      
        }
      
    } else if(ataqueActualJug==ataqueActualPc|| ataqueActualJug==ataques[0] && ataqueActualPc==ataques[3] || ataqueActualJug==ataques[3] && ataqueActualPc==ataques[0] ) {
        resulParcial="Es un empate 📋"

    } else if(ataqueActualJug==ataques[1] && ataqueActualPc==ataques[0] || ataqueActualJug==ataques[2] && ataqueActualPc==ataques[1] || ataqueActualJug==ataques[2] && ataqueActualPc==ataques[3] || ataqueActualJug==ataques[3] && ataqueActualPc==ataques[1]|| ataqueActualJug==ataques[0] && ataqueActualPc==ataques[2]) {
        resulParcial="Tu ganas 🏆";

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
    botonFuego.disabled=true;
    botonAgua.disabled=true;
    botonTierra.disabled=true;
    botonRayo.disabled=true;
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
}

function reinciar(){
    location.reload();
}

function imagenMokeponJugadorVs(mokepon){ //muestra imagen del mokepon elegido por el jugador
    for(e of mokepones){
        if(mokepon==e){            
            let imagenMokeponJugador=new Image(280,280); //width, height
            imagenMokeponJugador.src=`./assets/${e}.png`
            console.log(imagenMokeponJugador.src)
            mostrarMokeponJug.appendChild(imagenMokeponJugador);                   
        }
    } 
}

function imagenMokeponPcVs(mokepon){ //muestra imagen del mokepon elegido por el PC
    for(e of mokepones){
        if(mokepon==e){            
            let imagenMokeponJugador=new Image(280,280); //width, height
            imagenMokeponJugador.src=`./assets/${e}.png`
            console.log(imagenMokeponJugador.src)
            mostrarMokeponPc.appendChild(imagenMokeponJugador);                   
        }
    } 
}



