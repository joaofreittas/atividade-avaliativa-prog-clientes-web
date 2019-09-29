export class ServicoArtista {

    constructor( $ ) {
        this.$ = $;
    }

    getArtista() {
        return $.ajax({
            method:"GET",
            url:"http://localhost:3000/artistas"
        });
    }
    
    postArtista( objJson ){
        return $.ajax({
            method:"POST",
            url:"http://localhost:3000/artistas",
            data: JSON.parse( objJson )
        });
    }

    putArtista( objJson, id){
        return $.ajax({
            method:"PUT",
            url:"http://localhost:3000/artistas/"+id,
            data: JSON.parse( objJson )
        });
    }
    
    deleteArtista( id ){
        return $.ajax({
            method:"DELETE",
            url:"http://localhost:3000/artistas/"+id
        });
    }

    getOne( id ){
        return $.ajax({
            method:"GET",
            url:"http://localhost:3000/artistas/"+id
        });
    }

}