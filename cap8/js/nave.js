function Nave(context, teclado, imagem) {
    this.context = context;
    this.teclado = teclado;
    this.imagem = imagem;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;
    this.pontosVida = 3;
    this.spritesheet = new Spritesheet(context, imagem, 3, 2);
    this.spritesheet.linha = 0;
    this.spritesheet.intervalo = 100;
}
Nave.prototype = {
    atualizar: function () {
        var incremento = this.velocidade * this.animacao.decorrido / 1000;
        if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0)
            this.x -= incremento;

        if (this.teclado.pressionada(SETA_DIREITA) &&
            this.x < this.context.canvas.width - 36)
            this.x += incremento;

        if (this.teclado.pressionada(SETA_ACIMA) && this.y > 0)
            this.y -= incremento;

        if (this.teclado.pressionada(SETA_ABAIXO) &&
            this.y < this.context.canvas.height - 48)
            this.y += incremento;
    },
    desenhar: function(){
        if(this.teclado.pressionada(SETA_ESQUERDA)){
            this.spritesheet.linha = 1;
        }else if(this.teclado.pressionada(SETA_DIREITA)){
            this.spritesheet.linha = 2;
        }else{
            this.spritesheet.linha = 0;
        }

        this.spritesheet.desenhar(this.x, this.y);
        this.spritesheet.proximoQuadro();
        // this.context.drawImage(this.imagem, this.x, this.y,
        //     this.imagem.width, this.imagem.height);
    },
    atirar: function () {
        var t = new Tiro(this.context, this);
        this.animacao.novoSprite(t);
        this.colisor.novoSprite(t);
    },
    retangulosColisao: function(){
        //estes valores vao sendo ajustados aos poucos
        var rets = [
            {x: this.x+2, y: this.y+19, largura: 9, altura: 13},
            {x: this.x+13, y: this.y+3, largura: 10, altura: 33},
            {x: this.x+25, y: this.y+19, largura: 9, altura: 13}
        ];

        //desenhando os retangulos para visualizacao
        var ctx = this.context;
        for(var i in rets){
            ctx.save();
            ctx.strokeStyle = 'yellow';
            ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura, rets[i].altura);
            ctx.restore();
        }

        return rets;
    },
    colidiuCom: function(outro){
        //se colidiu com um Ovni, os dois desaparecem
        if(outro instanceof Ovni){
            this.pontosVida--;
            console.log(this.pontosVida);
            this.animacao.excluirSprite(outro);
            this.colisor.excluirSprite(outro);

            //verifica se eh o final do jogo
            if(this.pontosVida==0){
                //fim de jogo
                this.animacao.desligar();
                alert('GAME OVER!');
            }
        }
    }
}
