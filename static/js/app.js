let cont=true; // nos sirve para saber si el usuario ha elegido alguna opciòn ver linea 7
let vidasPC=3;
let vidasJug=3;
const mokepones=["charizar","blastoise","sceptile","picachu","arcanine","golduck"]; //mokepones totalespara elegir
const elementos={"charizar":"Fuego🔥", "blastoise":"Agua💧","sceptile":"Planta 🌱","picachu":"Rayo✨","arcanine":"Fuego🔥 + Planta🌱","golduck":"Agua💧 + Rayo✨" } //elementos de cada mokepon
const ataques=["Fuego🔥","Agua💧","Planta🌱","Rayo✨"]; // ataques existentes
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

let botonReiniciar=document.getElementById("boton-reiniciar");
botonReiniciar.addEventListener("click",reinciar);

inciarJuego();

function selectMokepon(){
    let sectionMascota=document.getElementById("seleccionar-mascota");
    
    for (let e of mokepones){ // ya que es un typo radio, con la propiedad checked revisamos si esta en true o false , recorremos cada opción posible y mostramos la que este true
    if(document.getElementById(e).checked){
        cont=false;
        mokeponjug=e; 
        alert(`Has elegido a ${e[0].toUpperCase() + e.substring(1)} \nElementos:  ${elementos[e]}`) 
        spanMokeJug.innerHTML=e[0].toUpperCase() + e.substring(1); // modificamos el DOM
        let botonSelectMokepon=document.getElementById("boton-mokepon");
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
    let sectionAtaques=document.getElementById("seleccionar-ataque");
    sectionAtaques.style.display="flex"// habilitamos la secciòn de seleccion ataque
    let sectionMensaje=document.getElementById("resultado");
    sectionMensaje.style.display="block"// habilitamos la secciòn de mensajes
    mokeponPc=mokepones[aleatorio(0,mokepones.length-1)]

    imagenMokeponJugadorVs(mokeponjug); //cargamos las imagenes del mokepon por el jugador Vs
    imagenMokeponPcVs(mokeponPc); //cargamos las imagenes del mokepon elegido por la PC Vs

    spanMokePc.innerHTML=mokeponPc[0].toUpperCase() + mokeponPc.substring(1); // modificamos el DOM de la eleccion del pc
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

alert(`${mokeponPc[0].toUpperCase() + mokeponPc.substring(1)} te ataca con ${ataqueActualPc}`)
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
    let sectionMsj=document.getElementById("resultado");
    let ataquesDelJugador=document.getElementById("ataques-del-jugador");
    let ataquesDelpc=document.getElementById("ataques-del-pc");

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
    let sectionMsj=document.getElementById("mensaje-final");

    let parrafo = document.createElement("h3"); // creamos un H3 en HTML que nos da el mensaje de victoria o derrota dependeindo del combate
    parrafo.innerHTML=resultado;
    sectionMsj.appendChild(parrafo) 

    let botonFuego=document.getElementById("boton-fuego");  // deshabilitar botones
    botonFuego.disabled=true;    
    let botonAgua=document.getElementById("boton-agua");
    botonAgua.disabled=true;
    let botonTierra=document.getElementById("boton-tierra");
    botonTierra.disabled=true;
    let botonRayo=document.getElementById("boton-rayo")
    botonRayo.disabled=true;

}

function inciarJuego(){ //para desactivar inicialmente lo que no queremos que se muestre
    let sectionAtaques=document.getElementById("seleccionar-ataque");
    sectionAtaques.style.display="none"// deshabilitamos la secciòn de seleccion ataque
    let sectionMensajes=document.getElementById("resultado");
    sectionMensajes.style.display="none"// deshabilitamos la secciòn de mensajes

}

function reinciar(){
    location.reload();
}

function imagenMokeponJugadorVs(mokepon){ //muestra imagen del mokepon elegido por el jugador

    for(e of mokepones){
        if(mokepon==e){
            let mostrarMokepon=document.getElementById("imagen-jugador");
            let imagenMokeponJugador=new Image(280,280); //width, height
            imagenMokeponJugador.src=`./assets/${e}.png`
            console.log(imagenMokeponJugador.src)
            mostrarMokepon.appendChild(imagenMokeponJugador);                   
        }
    } 

}

function imagenMokeponPcVs(mokepon){ //muestra imagen del mokepon elegido por el PC

    for(e of mokepones){
        if(mokepon==e){
            let mostrarMokepon=document.getElementById("imagen-pc");
            let imagenMokeponJugador=new Image(280,280); //width, height
            imagenMokeponJugador.src=`./assets/${e}.png`
            console.log(imagenMokeponJugador.src)
            mostrarMokepon.appendChild(imagenMokeponJugador);                   
        }
    } 

}



