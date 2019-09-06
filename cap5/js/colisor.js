function Colisor(){
    this.sprites = [];
}

Colisor.prototype = {
    novoSprite: function(sprite){
        this.sprites.push(sprite);
    },
    processar: function(){
        //instanciar um objeto vazio
        var jaTestados = new Object();

        for(var conti in this.sprites){
            for(var contj in this.sprites) {
                //nao colidir um sprite com ele mesmo
                if(conti==contj) continue;

                //gerar strings unicas para os objetos
                var id1 = this.stringUnica(this.sprites[conti]);
                var id2 = this.stringUnica(this.sprites[contj]);

                //criar arrays se nao existirem
                if(!jaTestados[id1]) jaTestados[id1] = [];
                if(!jaTestados[id2]) jaTestados[id2] = [];

                //teste de repeticao
                if(!((jaTestados[id1].indexOf(id2)>=0)||(jaTestados[id2].indexOf(id1)>=0))){
                    //abstrair a colisao
                    this.testarColisao(this.sprites[conti], this.sprites[contj]);
                    
                    //registrando o teste
                    jaTestados[id1].push(id2);
                    jaTestados[id2].push(id1);
                }
            }
        }
    },
    testarColisao: function(sprite1, sprite2){
        //obter os retangulos de colisao de cada sprite
        var rets1 = sprite1.retangulosColisao();
        var rets2 = sprite2.retangulosColisao();

        //testar as colisoes entre eles
        colisoes:
        for(var conti in rets1){
            for(var contj in rets2){
                //ainda abstraindo a formula!
                if(this.retangulosColidem(rets1[conti], rets2[contj])){
                    //eles colidem, vamos notifica-los
                    sprite1.colidiuCom(sprite2);
                    sprite2.colidiuCom(sprite1);

                    //nao precisa terminar de ver todos os retangulos
                    break colisoes;
                }
            }
        }
    },
    retangulosColidem: function(ret1, ret2){
        //formula de intersecao de retangulos
        return ((ret1.x+ret1.largura)>ret2.x) &&
               (ret1.x<(ret2.x+ret2.largura)) &&
               ((ret1.y+ret1.altura)>ret2.y) &&
               (ret1.y < (ret2.y+ret2.altura));
    },
    stringUnica: function (sprite) {
        var string = '';
        var retangulos = sprite.retangulosColisao();

        for (var cont in retangulos) {
            string += 'x: ' + retangulos[cont].x + ',' +
                'y: ' + retangulos[cont].y + ',' +
                'l: ' + retangulos[cont].largura + ',' +
                'a: ' + retangulos[cont].altura + '\n';
        }

        return string;
    }
};