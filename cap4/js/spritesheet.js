function Spritesheet(context, imagem, linhas, colunas){
	this.context = context;
	this.imagem = imagem;
	this.numLinhas = linhas;
	this.numColunas = colunas;
	this.intervalo = 0;
	this.linha = 0;
	this.coluna = 0;
}

Spritesheet.prototype = {
	proximoQuadro: function(){
		//momento atual
		var agora = new Date().getTime();

		//se ainda nao tem ultimo tempo medido
		if(!this.ultimoTempo) this.ultimoTempo = agora;

		//ja eh hora de mudar de coluna?
		if((agora-this.ultimoTempo)<this.intervalo) return;

		if(this.coluna<(this.numColunas-1)){
			this.coluna++;
		}else{
			this.coluna = 0;
		}

		//guardar hora da ultima mudanca
		this.ultimoTempo = agora;
	},
	desenhar: function(x, y){
		var largura = this.imagem.width / this.numColunas;
		var altura = this.imagem.heigth / this.numLinhas;

		this.context.drawImage(
			this.imagem,
			(largura * this.coluna),
			(altura * this.linha),
			largura,
			altura,
			x,
			y,
			largura,
			altura
		);
	}
};