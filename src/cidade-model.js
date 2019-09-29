export class Cidade{

    constructor( nome, sigla ){
        
        this.validaCamposVazios( nome, sigla );
        this.validaNome( nome );
        this.validaSigla( sigla );

        this.nome = nome;
        this.sigla = sigla;
    }

    validaNome( nome ){
        if( nome.length < 2 || nome.length > 60){
            throw new Error( 'O nome deve ter entre 2 e 60 caracteres' );
        }
    }

    validaSigla( sigla ){
        let exp = '^[A-Z]{2}$';
        let regex = new RegExp( exp );
        if( ! regex.test( sigla ) ){
            throw new Error( 'A sigla deve conter 2 caracteres maiúsculos' );
        }
    }

    validaCamposVazios( nome, sigla ){
        var campos = new Array( nome, sigla );
        for( let c of campos ){
            if(c == null || c == undefined || c == ""){
                throw new Error( "Não pode haver campos vazios !\n" );
            }
        }
    }
}