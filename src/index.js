import { Roteador } from "./roteador.js";
import { ServicoArtista } from "./servico-artista.js";
import * as jQuery from './jquery.js';
import { ControladoraArtista } from "./controladora-artista.js";
import { ServicoCidade } from "./servico-cidade.js";
import { ControladoraTelas } from "./controladora-telas.js";

window.addEventListener( 'load', function onLoad() {

    const paginas = {
        'cadastro-artista': './pages/cad-artista.js',
        'cadastro-cidade':  './pages/cad-cidade.js',
        'home':'./pages/home.js',
        '404':'./pages/404.js'
    };
    let raiz = document.getElementById('conteudo');
    
    let roteador = new Roteador( raiz, paginas, '404' );
    let servicoCidade = new ServicoCidade( $ );
    let servicoArtista = new ServicoArtista( $ );

    let ctrlTelas = new ControladoraTelas( servicoCidade, servicoArtista, roteador );
    let ctrlArtista = new ControladoraArtista( servicoArtista, roteador, ctrlTelas );


    //tela home - padrao
    ctrlTelas.goHome();

    //evento botao artistas
    document.getElementById( 'cadastro-artista' )
        .addEventListener( 'click', function artistaClick( e ) {
            ctrlTelas.goCadastroArtista();
    });
    
    //evento botao cidades
    document.getElementById( 'cadastro-cidade' )
        .addEventListener( 'click', function cidadeClick( e ) {
            ctrlTelas.goCadastroCidade();
    });

})