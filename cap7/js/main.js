//sprites da nave e do ovni
var imagemEspaco = new Image();
imagemEspaco.src = 'imagens/fundo-espaco.png';
imagemEspaco.onload = carregando;

var imagemEstrelas = new Image();
imagemEstrelas.src = 'imagens/fundo-estrelas.png';
imagemEstrelas.onload = carregando;

var imagemNuvens = new Image();
imagemNuvens.src = 'imagens/fundo-nuvens.png';
imagemNuvens.onload = carregando;

var imagemNave = new Image();
imagemNave.src = 'imagens/nave.png';
imagemNave.onload = carregando;

var imagemOvni = new Image();
imagemOvni.src = 'imagens/ovni.png';
imagemOvni.onload = carregando;

//referencia do canvas
var canvas = document.getElementById('canvas_inimigos');
var context = canvas.getContext('2d');

//instanciando os objetos
var teclado = new Teclado(document);
var animacao = new Animacao(context);

//gerando o fundo da animacao
var fundo1 = new Fundo(context, imagemEspaco);
fundo1.velocidade = 3;
animacao.novoSprite(fundo1);

var fundo2 = new Fundo(context, imagemEstrelas);
fundo2.velocidade = 7;
animacao.novoSprite(fundo2);

var fundo3 = new Fundo(context, imagemNuvens);
fundo3.velocidade = 10;
animacao.novoSprite(fundo3);

//gerando os elementos moveis da animacao
var nave = new Nave(context, teclado, imagemNave);
animacao.novoSprite(nave);

var colisor = new Colisor();
colisor.novoSprite(nave);
animacao.novoProcessamento(colisor);

teclado.disparou(ESPACO, function () {
    nave.atirar();
});

//funcoes
var carregadas = 0;
var total = 5;

function carregando() {
    carregadas++;
    if(carregadas==total) iniciar();
}

function iniciar() {
    nave.x = (canvas.width / 2) - (imagemNave.width / 2);
    nave.y = canvas.height - imagemNave.height;
    nave.velocidade = 5;
    animacao.ligar();

    setInterval(novoOvni, 1000);
}

//criacao dos inimigos
function novoOvni() {
    var ovni = new Ovni(context, imagemOvni);

    //minimo: 5; maximo: 20
    ovni.velocidade = Math.floor(5 + Math.random() * (20 - 5 + 1));

    //minimo: 0; maximo largura do canvas - largura do ovni
    ovni.x = Math.floor(Math.random() * (canvas.width - imagemOvni.width + 1));

    //descontar a altura
    ovni.y = -imagemOvni.height;

    animacao.novoSprite(ovni);
    colisor.novoSprite(ovni);
}