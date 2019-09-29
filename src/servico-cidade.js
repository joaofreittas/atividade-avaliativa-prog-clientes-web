export class ServicoCidade{

    constructor( $ ){
        this.$ = $;
    }

    getCidade() {
        return this.$.get( 'http://localhost:3001/cidades' );
    }

    postCidade( objJson ){
        return $.ajax({
            method:'POST',
            url: 'http://localhost:3001/cidades',
            data: JSON.parse( objJson )
        });
    }

    putCidade( objJson, id ){
        return $.ajax({
            method:"PUT",
            url: 'http://localhost:3001/cidades/'+id,
            data : JSON.parse( objJson )
        })
    }

    deleteCidade( id ){
        return $.ajax({
            method:'DELETE',
            url: 'http://localhost:3001/cidades/'+id
        });
    }

    getOne( id ){
        return $.ajax({
            method:'GET',
            url: 'http://localhost:3001/cidades/'+id
        });
    }
}