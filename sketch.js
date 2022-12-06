var TELA;
const TELA_MENU = 0;
const TELA_JOGO = 1;
var TELA_CONTROLES = false;
var TELA_SOBRE = false;
var TELA_GAMEOVER = false;
var TELA_WIN = false;
var onLoop = true;
var playing = false;
var bg, title, jogar, controles, sobre, som, voltar, escape, wasd, enter, shipAnim, ship, shapes, circulos, triangulos, quadrados, bullets, formato, objetivoAtual, font, shoot, destroyed, over, won;
var MARGIN = 30;
var nivelAtual = 0;
var quantFormas = 0;
var pontuacao = 0;
var timer = 0;
var formatos = ['square', 'triangle', 'circle'];
var formatosPT = ['quadrado', 'triângulo', 'círculo'];
var formatoAtual = formatosPT[0];

function preload(){
  // CARREGAMENTO DE IMAGENS E SONS
  shoot = loadSound('assets/shoot.wav');
  destroyed = loadSound('assets/destroyed.wav');
  over = loadSound('assets/over.wav');
  won = loadSound('assets/won.wav');
  bg = loadImage('assets/background.png');
  title = loadImage('assets/title.png');
  wasd = loadImage('assets/wasd.png');
  enter = loadImage('assets/enter.png');
  shipAnim = loadAnimation('assets/ship.png', { size: [16, 24], frames: 10 });
  shipAnim.frameDelay = 5;
  bulletImage = loadImage('assets/bullet.png');
  font = loadFont('assets/font.ttf');
}

function setup() {
  // CRIAÇÃO DO CANVAS
  createCanvas(800, 480);
  // CRIAÇÃO DOS GRUPOS DE SPRITES
  bullets = new Group();
  quadrados = new Group();
  circulos = new Group();
  triangulos = new Group();
  shapes = new Group();
  
  // CRIAÇÃO DA NAVE ESPACIAL
  ship = new Sprite(400, 450, 16, 24);
  ship.scale = 1.5;
  ship.addAnimation(shipAnim);
  ship.removeColliders();
  
  // TELA INICIAL
  TELA = TELA_MENU;
  
  // CRIAÇÃO DE BOTÕES
  jogar = new Button({
    x: 265, y: 300,
    width: 250, height: 50,
    align_x: 0, align_y: 0,
    content: 'JOGAR',
    on_press() {
      TELA = TELA_JOGO;
      playing = true;
    }
  });
  
  controls = new Button({
    x: 535, y: 300,
    width: 250, height: 50,
    align_x: 0, align_y: 0,
    content: 'CONTROLES',
    on_press() {
      TELA_CONTROLES = !TELA_CONTROLES;
      TELA_SOBRE = false;
      TELA_GAMEOVER = false;
      TELA_WIN = false;
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
      TELA_GAMEOVER = false;
      TELA_WIN = false;
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
  
  escape = new Button({
    x: 150, y: 55,
    width: 50, height: 50,
    align_x: 0, align_y: 0,
    content: 'X',
    on_press() {
      TELA_SOBRE = false;
      TELA_CONTROLES = false;
      TELA_GAMEOVER = false;
      TELA_WIN = false;
    }
  });
  
  voltar = new Button({
    x: 50, y: 30,
    width: 62.5, height: 25,
    align_x: 0, align_y: 0,
    content: '<',
    on_press() {
      TELA = TELA_MENU;
    }
  });
  
}

function draw() {
  
  // SELEÇÃO DE TELAS
  if(TELA === TELA_MENU){
    menu();
    if(TELA_CONTROLES){
      controles();
    }
    if(TELA_SOBRE){
      about();
    }
    if(TELA_GAMEOVER){
      gameover();
    }
    if(TELA_WIN){
      win();
    }
  }
  else if(TELA === TELA_JOGO){
    TELA_SOBRE = false;
    TELA_CONTTROLES = false;
    TELA_GAMEOVER = false;
    TELA_WIN = false;
    jogo();
  }
}

function menu(){
  // TELA DO MENU
  background(bg);
  image(title, 200, 50);
  
  jogar.draw();
  controls.draw();
  sobre.draw();
  som.draw();
}

function about(){
  // TELA SOBRE
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

function controles(){
  // TELA CONTROLES
  textFont(font);
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

function gameover(){
  // TELA GAME OVER
  textFont(font);
  fill('rgb(26, 32, 45)');
  rect(140, 50, 520, 100, 5);
  fill('white');
  textSize(30);
  text('GAME OVER', 400, 110);
  text('VOCÊ PERDEU! TENTE NOVAMENTE.', 400, 80);
  escape.draw();
}

function win(){
  textFont(font);
  fill('rgb(26, 32, 45)');
  rect(140, 50, 520, 100, 5);
  fill('white');
  textSize(30);
  text('PARABÉNS, VOCÊ GANHOU!', 400, 110);
  text('NÃO TEMOS PRÊMIOS, MAS BOA...', 400, 80);
  escape.draw();
}

function criarFormas(){
  // CRIAR FILEIRA DE FORMAS
  if(quantFormas === 0 && playing){
    won.play(0,1,15);
    for(let i = 0; i < 14; i++){ 
      
      formato = formatos[floor(random(0,3))];
      let shape = new Sprite(i * 60, 240, 50, formato);
      
      if(formato === 'square'){
        quadrados.add(shape);
        shape.color = 'yellow';
        shape.scale = 0.99;
      }
      else if(formato === 'triangle'){
        triangulos.add(shape);
        shape.color = 'cyan';
        shape.scale = 1.1;
      }
      else{
        circulos.add(shape);
        shape.color = 'magenta';
        shape.scale = 1;
      }
      shapes.add(shape);
    }
    quantFormas = 14;
    shapes.speed = nivelAtual + 1;
    bullets.speed *= 1.2;
    nivelAtual++;
  }
}

function semBordas(){
  for (var i = 0; i < allSprites.length; i++) {
    var sprite = allSprites[i];
    if (sprite.position.x < -MARGIN) {
      sprite.position.x = width + MARGIN;
    }
    if (sprite.position.x > width + MARGIN) {
      sprite.position.x = -MARGIN;
    }
    if (sprite.position.y < -MARGIN) {
      sprite.position.y = height + MARGIN;
    }
    if (sprite.position.y > height + MARGIN) {
      sprite.position.y = -MARGIN;
    }
  }
}

function destroy(bullet, shape){
  shape.remove();
  bullet.remove();
  destroyed.play();
  if(shape.scale === 1 && formatoAtual === formatosPT[2]){
    pontuacao++;
  }
  else if(shape.scale === 1.1 && formatoAtual === formatosPT[1]){
    pontuacao++;
  }
  else if(shape.scale === 0.99 && formatoAtual === formatosPT[0]){
    pontuacao++;
  }
  else{
    text("Errou!", 400, 300);
  }
  quantFormas--;
}

function placar(){
  textFont(font);
  fill('white');
  textSize(24);
  text(`Nível: ${nivelAtual} Pontuação: ${pontuacao}`, 400, 80);
  text(`Objetivo: ${objetivoAtual}`, 400, 100);
  
  if(formatoAtual === formatosPT[0]){
    fill('yellow');
  }
  else if(formatoAtual === formatosPT[1]){
    fill('cyan');
  }
  else{
    fill('magenta');
  }
  
  text(`${formatoAtual}`, 400, 45);
}

function jogo(){
  background(21, 34, 56);
  objetivoAtual = nivelAtual * 14;

  if(quantFormas === 0 && pontuacao < objetivoAtual && pontuacao != 0){
    playing = false;
    TELA = TELA_MENU;
    TELA_GAMEOVER = true;
    pontuacao = 0;
    nivelAtual = 0;
    ship.rotation = 0;
    over.play();
  }
  
  if(nivelAtual === 7){
    won.play();
    playing = false;
    TELA = TELA_MENU;
    TELA_WIN = true;
    pontuacao = 0;
    nivelAtual = 0;
    ship.rotation = 0;
  }
  
  // CONTROLES DO PERSONAGEM
  if(kb.pressing('left')){
    ship.rotation -= 4;
  }
  
  if(kb.pressing('right')){
    ship.rotation += 4;
  }
  
  if (kb.presses('ENTER') || kb.presses(' ')) {
    var bullet = new Sprite(ship.position.x, ship.position.y);
    bullet.scale = 1.5;
    bullet.width = 8;
    bullet.height = 8;
    bullet.addImage(bulletImage);
    bullet.rotation = ship.rotation - 90;
    bullet.speed = 10 + ship.getSpeed();
    bullet.direction = ship.rotation - 90;
    bullet.life = 40;
    bullets.add(bullet);
    shoot.play();
  }
  if(kb.presses('H')){
    nivelAtual = 6;
    playing = false;
    TELA = TELA_MENU;
    TELA_WIN = true;
    pontuacao = 0;
    nivelAtual = 0;
    ship.rotation = 0;
    shapes.removeAll();
  }
  
  timer++;
  rect(300, 20, timer, 17);
  if(frameCount % 200 === 0){
    formatoAtual = formatosPT[floor(random(0,3))];
    timer = 0;
  }
  
  bullets.collides(shapes, destroy);
  criarFormas();
  semBordas();
  placar();

}