//referencia do canvas
var canvas = document.getElementById('canvas_animacao');
var context = canvas.getContext('2d');

//variaveis principais
var imagens, animacao, teclado, colisor, nave, criadorInimigos;
var totalImagens = 0, carregadas = 0;

//carregando imagens
carregarImagens();

//definicao das funcoes
function carregarImagens(){
    imagens = {
        espaco: 'fundo-espaco.png',
        estrelas: 'fundo-estrelas.png',
        nuvens: 'fundo-nuvens.png',
        nave: 'nave-spritesheet.png',
        ovni: 'ovni.png'
    };

    for(var i in imagens){
        var img = new Image();
        img.src = 'imagens/' + imagens[i];
        img.onload = carregando;
        totalImagens++;

        //substituindo o nome pela imagem
        imagens[i] = img;
    }
}

function carregando(){
    carregadas++;
    if(carregadas==totalImagens) iniciarObjetos();
}

function iniciarObjetos(){
    //objetos principais
    animacao = new Animacao(context);
    teclado = new Teclado(document);
    colisor = new Colisor();
    espaco = new Fundo(context, imagens.espaco);
    estrelas = new Fundo(context, imagens.estrelas);
    nuvens = new Fundo(context, imagens.nuvens);
    nave = new Nave(context, teclado, imagens.nave);

    //ligacoes entre objetos
    animacao.novoSprite(espaco);
    animacao.novoSprite(estrelas);
    animacao.novoSprite(nuvens);
    animacao.novoSprite(nave);

    colisor.novoSprite(nave);
    animacao.novoProcessamento(colisor);

    configuracoesIniciais();
}

function configuracoesIniciais(){
    //Fundos
    espaco.velocidade = 60;
    estrelas.velocidade = 150;
    nuvens.velocidade = 500;

    //Nave
    nave.x = (canvas.width / 2) - 18;
    nave.y = canvas.height - 48;
    nave.velocidade = 200;

    //Tiro
    teclado.disparou(ESPACO, function(){
        nave.atirar();
    });

    //iniciar animacao
    animacao.ligar();

    //criando inimigos
    criacaoInimigos();
}

function criacaoInimigos(){
    criadorInimigos = {
        ultimoOvni: new Date().getTime(),
        processar: function(){
            var agora = new Date().getTime();
            var decorrido = agora - this.ultimoOvni;

            if(decorrido>1000){
                novoOvni();
                this.ultimoOvni = agora;
            }
        }
    };

    animacao.novoProcessamento(criadorInimigos);
}

function novoOvni() {
    var img = imagens.ovni;
    var ovni = new Ovni(context, img);

    //minimo: 5; maximo: 20
    ovni.velocidade = Math.floor(5 + Math.random() * (20 - 5 + 1));

    //minimo: 0; maximo largura do canvas - largura do ovni
    ovni.x = Math.floor(Math.random() * (canvas.width - img.width + 1));

    //descontar a altura
    ovni.y = -img.height;

    animacao.novoSprite(ovni);
    colisor.novoSprite(ovni);
}