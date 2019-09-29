export class ControladoraTelas{

    constructor(servicoCidade, servicoArtista, roteador){
        this.servicoCidade = servicoCidade;
        this.servicoArtista = servicoArtista;
        this.roteador = roteador;
    }

    goHome(){
        var _this = this;
        var result = this.servicoArtista.getArtista();
        result.then( function( response ){
            _this.servicoCidade.getCidade()
                .then( ( responseCidades ) => {
                    _this.roteador.irPara( 'home', response, responseCidades );

                }).catch( ( responseCidades ) =>{

                })
        }).catch( function( response ){
            console.log( response );
        });
    }

    goCadastroCidade( obj ){
        if( obj == undefined || obj == null || obj == ""){
            this.roteador.irPara('cadastro-cidade');
        }else{
            this.roteador.irPara( 'cadastro-cidade', null, obj );
        }
    }

    goCadastroArtista( obj ){
        //para cadastro
        if( obj == undefined || obj == null || obj == ""){
            var _this = this;
            var result = this.servicoCidade.getCidade(); 
            result.then( function( response ){
                _this.roteador.irPara( 'cadastro-artista', response );
            }).catch( function( response ){
                console.log( 'err:'+response );
            });

        //para editar    
        }else{

            var _this = this;
            var result = this.servicoCidade.getCidade(); 
            result.then( function( response ){
                _this.roteador.irPara( 'cadastro-artista', response, obj );
            }).catch( function( response ){
                console.log( 'err:'+response );
            });
        }
    }
}