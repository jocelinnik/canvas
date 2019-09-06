function Bola(context){
    this.context = context;
    this.x = 0;
    this.y = 0;
    this.velocidadeX = 0;
    this.velocidadeY = 0;

    //atributos de desenho padrao
    this.cor = 'black';
    this.raio = 10;
}

Bola.prototype = {
    atualizar: function(){
        var ctx = this.context;

        if((this.x<this.raio)||(this.x>(ctx.canvas.width-this.raio))){
            this.velocidadeX *= -1;
        }

        if((this.y<this.raio)||(this.y>(ctx.canvas.height-this.raio))) {
            this.velocidadeY *= -1;
        }

        this.x += this.velocidadeX;
        this.y += this.velocidadeY;
    },
    desenhar: function(){
        var ctx = this.context;

        ctx.save();
        ctx.fillStyle = this.cor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.raio, 0, (2*Math.PI), false);
        ctx.fill();
        ctx.restore();
    },
    //interface de colisao
    retangulosColisao: function(){
        return [{
            x: (this.x - this.raio), //this.x e o centro da bola
            y: (this.y - this.raio), //this.y tambem
            largura: (2 * this.raio),
            altura: (2 * this.raio)
        }];
    },
    colidiuCom: function(sprite){
        if(this.x<sprite.x){ //estou na esquerda
            this.velocidadeX = -Math.abs(this.velocidadeX); //-
        }else{
            this.velocidadeX = Math.abs(this.velocidadeX); //+
        }

        if(this.y<sprite.y){ //estou acima
            this.velocidadeY = -Math.abs(this.velocidadeY); //-
        }else{
            this.velocidadeY = Math.abs(this.velocidadeY); //+
        }
    }
};