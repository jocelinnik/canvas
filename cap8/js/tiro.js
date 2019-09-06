function Tiro(context, nave){
    this.context = context;
    this.nave = nave;

    //posicionando o tiro no bico da nave
    this.largura = 3;
    this.altura = 10;
    this.x = nave.x + 18;
    this.y = nave.y - this.altura;
    this.velocidade = 10;

    //cor do tiro
    this.cor = 'yellow';
}

Tiro.prototype = {
    atualizar: function(){
        this.y -= this.velocidade;

        //excluir o tiro quando sumir da tela
        if(this.y < -this.altura){
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    },
    desenhar: function(){
        var ctx = this.context;
        ctx.save();
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x,this.y,this.largura,this.altura);
        ctx.restore();
    },
    retangulosColisao: function () {
        return [ {x: this.x, y: this.y, largura: this.largura, altura: this.altura} ];
    },
    colidiuCom: function (outro) {
        
    }
};