export class Artista{

    constructor( nome, categoria, ritmos, cidade, telefone){
        
        this.validaCamposVazios( nome, categoria, ritmos, cidade, telefone );
        this.validaNome( nome );
        this.validaRitmos( ritmos );
        this.validaTelefone( telefone );

        this.nome = nome;
        this.categoria = categoria;
        this.ritmos = ritmos;
        this.cidade = cidade;
        this.telefone = telefone;
           
    }

    validaNome( nome ){
        if(nome.length < 1 || nome.length > 100 ){
            throw new Error( 'O nome deve ter entre 1 e 100 caracteres.' )
        }
    }

    validaRitmos( ritmos ){
        if( ritmos.includes(' ')){
            if( ! ritmos.split(',') ){
                throw new Error( 'Separe os ritmos por vírgula' );
            }
        }
        
    }

    validaTelefone( telefone ){
        var exp = '^\\([0-9]{2}\\)(([0-9]{4}-[0-9]{4}) | ([0-9]{5}-[0-9]{4}))$';
        var regex = new RegExp( exp );
        if( ! regex.test( telefone ) ){
            throw new Error( 'O telefone precisa estar no formato (XX) xxxxx-xxxx ');
        }

    }

    validaCamposVazios( nome, categoria, ritmos, cidade, telefone){
        var campos = new Array( nome, categoria, ritmos, cidade, telefone );
        for( let c of campos ){
            if(c == null || c == undefined || c == ""){
                throw new Error( "Não pode haver campos vazios !\n" );
            }
        }
    }
}