const TELA_MENU = 0;
var TELA_CONT = false;
var TELA_SOBRE = false;
const TELA_JOGO = 3
var TELA;
var bg, title, jogar, controles, sobre, som, voltar, escape, wasd, enter, ship;
var onLoop = true;
let square;

function preload(){
  bg = loadImage('assets/background.png');
  title = loadImage('assets/title.png');
  wasd = loadImage('assets/wasd.png');
  enter = loadImage('assets/enter.png');
  ship = loadAnimation('assets/ship.png', { size: [24, 16], frames: 10 });
}

function setup() {
  var canvas = createCanvas(800, 480);
  canvas.parent('game');
  TELA = TELA_MENU;

  jogar = new Button({
    x: 265, y: 300,
    width: 250, height: 50,
    align_x: 0, align_y: 0,
    content: 'JOGAR',
    on_press() {
      TELA = TELA_JOGO;
    }
  });
  
  controles = new Button({
    x: 535, y: 300,
    width: 250, height: 50,
    align_x: 0, align_y: 0,
    content: 'CONTROLES',
    on_press() {
      TELA_CONT = !TELA_CONT;
      TELA_SOBRE = false;
    }
  });
  
  sobre = new Button({
    x: 265, y: 375,
    width: 250, height: 50,
    align_x: 0, align_y: 0,
    content: 'SOBRE',
    on_press() {
      TELA_SOBRE = !TELA_SOBRE;
      TELA_CONT = false;
    }
  });
  
  som = new Button({
    x: 535, y: 375,
    width: 250, height: 50,
    align_x: 0, align_y: 0,
    content: 'MUSICA: ON',
    on_press() {
      if(onLoop === true){
        som.text('MUSICA: OFF');
        onLoop = false;
      }
      else{
        som.text('MUSICA: ON');
        onLoop = true;
      }
    }
  });
  
  voltar = new Button({
    x: 400, y: 300,
    width: 250, height: 50,
    align_x: 0, align_y: 0,
    content: 'VOLTAR',
    on_press() {
      TELA = TELA_MENU;
    }
  });
  
  escape = new Button({
    x: 150, y: 55,
    width: 50, height: 50,
    align_x: 0, align_y: 0,
    content: 'X',
    on_press() {
      TELA_SOBRE = false;
      TELA_CONT = false;
    }
  });
  
}

function draw() {
  
  if(TELA == TELA_MENU){
    menu();
    if(TELA_CONT){
      cont();
    }
    if(TELA_SOBRE){
      about();
    }
  }
  
  else if(TELA = TELA_JOGO){
    TELA_SOBRE = false;
    TELA_CONT = false;
    jogo();
  }
  
}

function menu(){
  background(bg);
  image(title, 200, 50);
  
  jogar.draw();
  controles.draw();
  sobre.draw();
  som.draw();
}

function about(){
  fill('rgb(26, 32, 45)');
  rect(140, 50, 520, 200, 5);
  fill('white');
  textSize(24);
  text('desenvolvedor: Franklin Oliveira', 400, 80);
  text('email: franklin-oliveira@ufrn.edu.br', 400, 110);
  text('github: @franklinclf/shapefinder', 400, 130);
  text('bibliotecas utilizadas:', 400, 160);
  text('p5.js buttons.p5.js play.p5.js', 400, 180);
  text('supervisionado por: Thales Aguiar', 400, 210);
  escape.draw();
}

function cont(){
  fill('rgb(26, 32, 45)');
  rect(140, 50, 520, 200, 5);
  fill('white');
  text('movimento', 310, 220);
  text('atirar', 510, 220);
  image(wasd, 225, 100, 156, 96);
  image(enter, 450, 130, 114, 42);
  textSize(20);
  text('seu objetivo é atirar nas formas geométricas em suas', 400, 70);
  text('respectivas cores indicadas na tela aleatoriamente', 400, 90);
  escape.draw();
}

function jogo(){
  background(bg);
  text('Essa é a tela do jogo!', 400, 240);
  voltar.draw();
  fill('white');
}
