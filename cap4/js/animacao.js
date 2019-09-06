function Animacao(context){
    this.context = context;
    this.sprites = [];
    this.ligado = false;
}

Animacao.prototype = {
    novoSprite: function(sprite){
        this.sprites.push(sprite);
    },
    ligar: function(){
        this.ligado = true;
        this.proximoFrame();
    },
    desligar: function(){
        this.ligado = false;
    },
    limparTela: function(){
        var ctx = this.context;
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
    },
    proximoFrame: function(){
        //verifica se esta ligado
        if(!this.ligado) return;

        //a cada ciclo, limpamos a tela ou desenhamos um fundo
        this.limparTela();

        //atualizamos o estado dos sprites
        for(var cont in this.sprites){
            this.sprites[cont].atualizar();
        }

        //desenhamos as sprites
        for(var cont in this.sprites){
            this.sprites[cont].desenhar();
        }

        //chamamos o proximo ciclo
        var animacao = this;
        requestAnimationFrame(function(){
            animacao.proximoFrame();
        });
    }
}; 