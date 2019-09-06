function Fundo(context, imagem){
    this.context = context;
    this.imagem = imagem;
    this.velocidade = 0;
    this.posicaoEmenda = 0;
}

Fundo.prototype = {
    atualizar: function(){
        //atualizar a posicao da emenda
        this.posicaoEmenda += this.velocidade * this.animacao.decorrido / 1000;

        //emenda passou da posicao
        if(this.posicaoEmenda>this.imagem.width){
            this.posicaoEmenda = 0;
        }
    },
    desenhar: function(){
        var imagem = this.imagem;

        //primeira copia
        var posicaoY = (this.posicaoEmenda - imagem.width);
        this.context.drawImage(imagem, 0, posicaoY, imagem.width, imagem.height);

        //segunda copia
        var posicaoY = this.posicaoEmenda;
        this.context.drawImage(imagem, 0, posicaoY, imagem.width, imagem.height);
    }
};