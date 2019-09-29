import { ServicoCidade } from "./servico-cidade.js";
import * as jQuery from "./jquery.js";

export class ControladoraCidade{

    constructor( servicoCidade, roteador, ctrlTelas ){
        this.servicoCidade = servicoCidade;
        this.roteador = roteador;
        this.ctrlTelas = ctrlTelas;
    }
 
    adicionarCidade( objJson ){
        var _this = this;
        var result = this.servicoCidade.postCidade( objJson );
        result.then( function( response ){
            _this.ctrlTelas.goHome();
        }).catch( function( response ){
            console.log( response );
        })
    }

    excluirCidade( id ){
        var _this = this;
        var result = this.servicoCidade.deleteCidade( id );
        result.then( function( response ){
            _this.ctrlTelas.goHome();
        }).catch( function( response ){
            console.log( response );
        })
    }

    alterarCidade( objJson, id ){
        var _this = this;
        var result = this.servicoCidade.putCidade( objJson, id );
        result.then( function( response ){
            _this.ctrlTelas.goHome();
        }).catch( function( response ){
            console.log( response );
        })
    }

    buscarPorId( id ){
        this.servicoCidade = new ServicoCidade( $ );
        var _this = this;
        var result = this.servicoCidade.getOne( id );
        return result;
    }
}