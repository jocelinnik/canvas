var SONIC_DIREITA = 1;
var SONIC_ESQUERDA = 2;

function Sonic(context, teclado, imagem){
	this.context = context;
	this.teclado = teclado;
	this.x = 0;
	this.y = 0;
	this.velocidade = 10;

	//criando a spritesheet a partir da imagem recebida
	this.folha = new Spritesheet(context,imagem,3,8);
	this.folha.intervalo = 60;

	//estado inicial
	this.andando = false;
	this.direcao = SONIC_DIREITA;
}

Sonic.prototype = {
	atualizar: function(){
		if(this.teclado.pressionada(SETA_DIREITA)){
			//se ja nao estava neste estado...
			if((!this.andando)||(this.direcao!=SONIC_DIREITA)){
				//seleciono o quadro da spritesheet
				this.folha.linha = 1;
				this.folha.coluna = 0;
			}

			//configurando o estado atual
			this.andando = true;
			this.direcao = SONIC_DIREITA;

			//neste estado, a animacao da spritesheet deve rodar
			this.folha.proximoQuadro();

			//deslocando o Sonic
			this.x += this.velocidade;
		}else if(this.teclado.pressionada(SETA_ESQUERDA)){
			//se ja nao estava neste estado...
			if((!this.andando)||(this.direcao!=SONIC_ESQUERDA)){
				//seleciono o quadro da spritesheet
				this.folha.linha = 2;
				this.folha.coluna = 0;
			}

			//configurando o estado atual
			this.andando = true;
			this.direcao = SONIC_ESQUERDA;

			//neste estado, a animacao da spritesheet deve rodar
			this.folha.proximoQuadro();

			//deslocando o Sonic
			this.x -= this.velocidade;
		}else{
			if(this.direcao==SONIC_DIREITA){
				this.folha.coluna = 0;
			}else if(this.direcao==SONIC_ESQUERDA){
				this.folha.coluna = 1;
			}

			this.folha.linha = 0;
			this.andando = false;
		}
	},
	desenhar: function(){
		this.folha.desenhar(this.x, this.y);
	}
};