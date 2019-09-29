export class ControladoraArtista{
 
    constructor( servicoArtista, roteador, ctrlTelas ) {
        this.servicoArtista = servicoArtista;
        this.roteador = roteador;
        this.ctrlTelas = ctrlTelas;
    }

    adicionarArtista( objJson ){
        var _this = this;
        var result = this.servicoArtista.postArtista( objJson );
        result.then( function( response ){
            _this.ctrlTelas.goHome();
        }).catch( function( response ){
            console.log( response );
        })
    }

    alterarArtista( objJson, id ){
        var _this = this;
        var result = this.servicoArtista.putArtista( objJson, id );
        result.then( function( response ){
            _this.ctrlTelas.goHome();
        }).catch( function( response ){
            console.log( response );
        })
    }

    excluirArtista( id ){
        var _this = this;
        var result = this.servicoArtista.deleteArtista( id );
        result.then( function( response ){
            _this.ctrlTelas.goHome();
        }).catch( function( response ){
            console.log( response );
        })
    }

    buscarPorId( id ){
        var _this = this;
        var result = this.servicoArtista.getOne( id );
        return result;
    }

}