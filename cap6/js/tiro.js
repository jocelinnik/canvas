function Tiro(context, nave){
    this.context = context;
    this.nave = nave;

    //posicionando o tiro no bico da nave
    this.largura = 4;
    this.altura = 20;
    this.x = (nave.x + nave.imagem.width / 2) - (this.largura / 2);
    this.y = nave.y - this.altura;
    this.velocidade = 10;

    //cor do tiro
    this.cor = 'red';
}

Tiro.prototype = {
    atualizar: function(){
        this.y -= this.velocidade;
    },
    desenhar: function(){
        var ctx = this.context;
        ctx.save();
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x,this.y,this.largura,this.altura);
        ctx.restore();
    }
};