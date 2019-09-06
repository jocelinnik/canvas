function Animacao(context) {
    this.context = context;
    this.sprites = [];
    this.spritesExcluir = [];
    this.processamentos = [];
    this.processamentosExcluir = [];
    this.ligado = false;
    this.ultimoCiclo = 0;
    this.decorrido = 0;
}
Animacao.prototype = {
    novoSprite: function (sprite) {
        this.sprites.push(sprite);
        sprite.animacao = this;
    },
    excluirSprite: function(sprite){
        this.spritesExcluir.push(sprite);
    },
    novoProcessamento: function (processo) {
        this.processamentos.push(processo);
        processo.animacao = this;
    },
    excluirProcessamento: function(processo){
        this.processamentosExcluir.push(processo);
    },
    ligar: function () {
        this.ligado = true;
        this.proximoFrame();
    },
    desligar: function () {
        this.ligado = false;
    },
    proximoFrame: function () {
        // Posso continuar?
        if (!this.ligado) return;

        // Atualizamos o estado dos sprites
        for (var i in this.sprites) this.sprites[i].atualizar();

        // Desenhamos os sprites
        for (var i in this.sprites) this.sprites[i].desenhar();

        // processamentos gerais
        for (var i in this.processamentos) this.processamentos[i].processar();

        //processamento de exclusoes
        this.processarExclusoes();

        // Chamamos o próximo ciclo
        var animacao = this;
        requestAnimationFrame(function () {
            animacao.proximoFrame();
        });
    },
    processarExclusoes: function(){
        //criar novos arrays
        var novoSprites = [];
        var novoProcessamentos = [];

        //adicionar somente os elementos nao excluidos
        for (var i in this.sprites) {
            if (this.spritesExcluir.indexOf(this.sprites[i]) == -1) {
                novoSprites.push(this.sprites[i]);
            }
        }

        for (var i in this.processamentos) {
            if (this.processamentosExcluir.indexOf(this.processamentos[i]) == -1) {
                novoProcessamentos.push(this.processamentos[i]);
            }
        }

        //limpar os arrays de exclusoes
        this.spritesExcluir = [];
        this.processamentosExcluir = [];

        //substituir o array velho pelo novo
        this.sprites = novoSprites;
        this.processamentos = novoProcessamentos;
    },
    limparTela: function () {
        var ctx = this.context;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
}
