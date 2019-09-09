//referencia do canvas
var canvas = document.getElementById('canvas_animacao');
var context = canvas.getContext('2d');

//variaveis principais
var imagens, animacao, teclado, colisor, nave, criadorInimigos;
var totalImagens = 0, carregadas = 0;
var musicaAcao;

//carregando imagens e sons
carregarImagens();
carregarMusicas();

//definicao das funcoes
function carregarImagens(){
    // Objeto contendo os nomes das imagens
    imagens = {
        espaco: 'fundo-espaco.png',
        estrelas: 'fundo-estrelas.png',
        nuvens: 'fundo-nuvens.png',
        nave: 'nave-spritesheet.png',
        ovni: 'ovni.png',
        explosao: 'explosao.png'
    };

    // Carregar todas
    for (var i in imagens) {
        var img = new Image();
        img.src = './imagens/' + imagens[i];
        img.onload = carregando;
        totalImagens++;

        // Substituir o nome pela imagem
        imagens[i] = img;
    }
}

function carregando(){
    context.save();

    //fundo
    context.drawImage(imagens.espaco, 0, 0, canvas.width, canvas.height);

    //Texto 'Carregando'
    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.font = '50px sans-serif';
    context.fillText("Carregando...", 100, 200);
    context.strokeText("Carregando...", 100, 200);

    //barra de loading
    carregadas++;
    var tamanhoTotal = 300;
    var tamanho = carregadas / totalImagens * tamanhoTotal;
    context.fillStyle = 'yellow';
    context.fillRect(100, 250, tamanho, 50);

    context.restore();

    if(carregadas==totalImagens){
        iniciarObjetos();
        mostrarLinkJogar();
    }
}

function iniciarObjetos(){
    //objetos principais
    animacao = new Animacao(context);
    teclado = new Teclado(document);
    colisor = new Colisor();
    espaco = new Fundo(context, imagens.espaco);
    estrelas = new Fundo(context, imagens.estrelas);
    nuvens = new Fundo(context, imagens.nuvens);
    nave = new Nave(context, teclado, imagens.nave, imagens.explosao);
    painel = new Painel(context, nave);

    //ligacoes entre objetos
    animacao.novoSprite(espaco);
    animacao.novoSprite(estrelas);
    animacao.novoSprite(nuvens);
    animacao.novoSprite(painel);
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
    nave.posicionar();
    nave.velocidade = 200;

    //criando inimigos
    criacaoInimigos();
    
    //game over
    nave.acabaramVidas = function(){
        animacao.desligar();
        gameOver();
    }

    //pontuacao
    colisor.aoColidir = function(o1, o2){
        //Tiro com Ovni
        if((o1 instanceof Tiro && o2 instanceof Ovni)||(o1 instanceof Ovni && o2 instanceof Tiro)){
            painel.pontuacao += 10;
        }
    }

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
    var ovni = new Ovni(context, img, imagens.explosao);

    //minimo: 500; maximo: 1000
    ovni.velocidade = Math.floor(500 + Math.random() * (1000 - 500 + 1));

    //minimo: 0; maximo largura do canvas - largura do ovni
    ovni.x = Math.floor(Math.random() * (canvas.width - img.width + 1));

    //descontar a altura
    ovni.y = -img.height;

    animacao.novoSprite(ovni);
    colisor.novoSprite(ovni);
}

function pausarJogo(){
    if(animacao.ligado){
        animacao.desligar();
        ativarTiro(false);
        context.save();
        context.fillStyle = 'white';
        context.strokeStyle = 'black';
        context.font = '50px sans-serif';
        context.fillText("Pausado", 160, 200);
        context.strokeText("Pausado", 160, 200);
    }else{
        criadorInimigos.ultimoOvni = new Date().getTime();
        animacao.ligar();
        ativarTiro(true);
    }
}

function ativarTiro(ativar){
    if(ativar){
        teclado.disparou(ESPACO, function(){
            nave.atirar();
        });
    }else{
        teclado.disparou(ESPACO, null);
    }
}

function carregarMusicas(){
    musicaAcao = new Audio();
    musicaAcao.src = 'sons_musicas/musica-acao.mp3';
    musicaAcao.volume = 0.8;
    musicaAcao.loop = true;
    musicaAcao.load();
}

function mostrarLinkJogar(){
    document.getElementById('link_jogar').style.display = 'block';
}

function iniciarJogo(){
    criadorInimigos.ultimoOvni = new Date().getTime();

    //Tiro
    ativarTiro(true);

    //Pausa
    teclado.disparou(ENTER, pausarJogo);

    document.getElementById('link_jogar').style.display = 'none';
    musicaAcao.play();
    animacao.ligar();
}

function gameOver(){
    //Tiro
    ativarTiro(false);

    //Pausa
    teclado.disparou(ENTER, null);

    //parar a musica e rebobinar
    musicaAcao.pause();
    musicaAcao.currentTime = 0.0;

    //fundo
    context.drawImage(imagens.espaco, 0, 0, canvas.width, canvas.height);

    //texto 'Game Over'
    context.save();
    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.font = '70px sans-serif';
    context.fillText("GAME OVER", 40, 200);
    context.strokeText("GAME OVER", 40, 200);
    context.restore();

    //volta o link Jogar
    mostrarLinkJogar();

    //restaurar as condicoes da nave
    nave.vidasExtras = 3;
    nave.posicionar();
    animacao.novoSprite(nave);
    colisor.novoSprite(nave);

    //tirando todos os inimigos da tela
    removerInimigos();
}

function removerInimigos(){
    for(var i in animacao.sprites){
        if(animacao.sprites[i] instanceof Ovni){
            animacao.excluirSprite(animacao.sprites[i]);
        }
    }
}