export class Roteador{

    constructor( raiz, paginas, pagina404 ){
        this.raiz = raiz;
        this.paginas = paginas;
        this.pagina404 = pagina404;
    }

    
    irPara( pagina, conteudo, objEdit){
        const p = this.paginas[ pagina ] || this.paginas[ this.pagina404 ];
        import(p).then( resultado => {
                const obj = resultado.default;
                this.raiz.innerHTML = obj.render( conteudo, objEdit );
                obj.afterRender( this );
            })
            .catch( console.error );
    }
}