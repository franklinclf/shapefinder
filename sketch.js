var TELA_MENU = false;
var TELA_CONT = false;
var TELA_SOBRE = false;
var TELA_JOGO = false;
var bg;
var title;
var jogar, controles, sobre, som;
var count = 0;

function preload(){
  bg = loadImage('assets/background.png');
  title = loadImage('assets/title.png');
}

function setup() {
  background(0);
  var canvas = createCanvas(800, 480);
  canvas.parent('game');
  TELA_MENU = true;
}

function draw() {
  
  if(TELA_MENU){
    menu();
    if(TELA_CONT){
      controles();
    }
    else if(TELA_SOBRE){
      sobre();
    }
  }
  
  else if(TELA_JOGO){
    jogo();
  }
  
}

function menu(){
  background(bg);
  image(title, 200, 0);
  
  jogar = new button({
    x: width/2, y: height/2,
    width: 100, height: 50,
    align_x: 0, align_y: 0,
    content: 'Clicks: 0',
    on_press() {
      count++;
      jogar.text( 'Clicks'+count );
    }
  });
  
  jogar.draw;
}

function sobre(){

}

function controles(){
  
}

function jogo(){

}

