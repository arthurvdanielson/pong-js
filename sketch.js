//variaveis da bolinha
let xbol = 300;                   
let ybol= 200;
let diametro = 15;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadexbol = 6;                  
let velocidadeybol = 6;

//variaveis minha raquete
let xraq = 10;
let yraq = 150;
let compraq = 10;
let altraq = 90;

//variaveis do oponente
let xraqop = 580;
let yraqop = 150;
let veloyop;

//placar do jogo
let meuspontos = 0;
let pontosop = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

//chance de errar
let chanceDeErrar = 0;

let colidiu = false;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);          //cria background
  mostrabol();            // 1 - mostra a bolinha
  movimentabol();         // 2 - movimenta a bolinha
  verificolisaobor();     // 3 - verifica a colisao com a borda
  mostraraq(xraq, yraq);         // 4 - mostra a minha raquete
  movimentaraq();      // 5 - movimenta a minha raquete
  //verificolisaoraq();     // 6 - verifica a colisao com a minha raquete
  colisaoraq(xraq, yraq);
  mostraraq(xraqop, yraqop);
  movimentaraqop();
  colisaoraq(xraqop, yraqop);
  incluiplacar();
  marcaponto();
  bolinhaNaoFicaPresa();
}

function mostrabol(){
  circle(xbol, ybol, diametro); // 1
}

function movimentabol(){        // 2
  xbol += velocidadexbol;
  ybol += velocidadeybol;
}

function verificolisaobor(){   
  if (xbol + raio> width || xbol - raio< 0){       // 3
    velocidadexbol *= -1;
  }
  if (ybol + raio> height || ybol - raio < 0){
    velocidadeybol *= -1;
  }
}

function mostraraq(x,y){       // 4
  rect(x, y, compraq, altraq);
}

function movimentaraq(){   // 5
  if (keyIsDown(UP_ARROW)) {
        yraq -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
        yraq += 10;
  }
}

function verificolisaoraq(){
  if(xbol - raio < xraq + compraq && ybol - raio < yraq + altraq && ybol + raio > yraq){
    velocidadexbol *= -1;
    raquetada.play();
  }
}

function colisaoraq(x,y){
  colidiu = collideRectCircle(x, y, compraq, altraq, xbol, ybol, raio);
  if(colidiu){
    velocidadexbol *= -1;
    raquetada.play();
  }

}

function movimentaraqop(){
  veloyop = ybol - yraqop - compraq / 2 - 30;
  yraqop += veloyop + chanceDeErrar;
  calculaChanceDeErrar();
}

function incluiplacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meuspontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosop, 470, 26);
}

function marcaponto(){
  if (xbol > 590){
    meuspontos += 1;
    ponto.play();
  }
  if (xbol < 10){
    pontosop += 1;
    ponto.play();
  }
}

function calculaChanceDeErrar(){
  if (pontosop >= meuspontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}


function bolinhaNaoFicaPresa(){
    if (xbol - raio < 0){
    xbol = 23
    }
}
