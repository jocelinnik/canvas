function Ovni(context, imagem){
    this.context = context;
    this.imagem = imagem;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;
}

Ovni.prototype = {
    atualizar: function(){
        this.y += this.velocidade;

        if(this.y > this.context.canvas.height){
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    },
    desenhar: function(){
        var ctx = this.context;
        var imagem = this.imagem;
        ctx.drawImage(imagem, this.x, this.y, imagem.width, imagem.height);
    },
    retangulosColisao: function () {
        var rets = [
            {x: this.x+20, y: this.y+1, largura: 25, altura: 10},
            {x: this.x+2, y: this.y+11, largura: 60, altura: 12},
            {x: this.x+20, y: this.y+23, largura: 25, altura: 7}
        ];

        //desenhando os retangulos para visualizacao
        var ctx = this.context;
        for (var i in rets) {
            ctx.save();
            ctx.strokeStyle = 'yellow';
            ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura, rets[i].altura);
            ctx.restore();
        }

        return rets;
    },
    colidiuCom: function (outro) {
        //se colidiu com um Tiro, os dois desaparecem
        if(outro instanceof Tiro){
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
            this.animacao.excluirSprite(outro);
            this.colisor.excluirSprite(outro);
        }
    }
};