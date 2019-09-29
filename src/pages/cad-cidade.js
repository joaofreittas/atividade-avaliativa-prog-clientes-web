import { Roteador } from "../roteador.js";
import { ServicoArtista } from "../servico-artista.js";
import * as jQuery from '../jquery.js';
import { ControladoraArtista } from "../controladora-artista.js";
import { Cidade } from "../cidade-model.js";
import { ServicoCidade } from "../servico-cidade.js";
import { ControladoraCidade } from "../controladora-cidade.js";
import { ControladoraTelas } from "../controladora-telas.js";
let cadastroCidade = {

    render( data, obj ){

        if( obj == undefined || obj == null || obj == "" ){
            return `
                <button id="back-home">Home</button>
                <h3>Cadastro de Cidades</h3>
                <input type="text" id="nome" placeholder=" Nome ">
                <input type="text" id="sigla" placeholder=" Sigla ">
                <button id="btnCadastro">Cadastrar</button>
            `;
        }else{
            return `
                <button id="back-home">Home</button>
                <h3>Cadastro de Cidades</h3>
                <input type="hidden" id="id" value="${obj.id}">
                <input type="text" id="nome" value="${obj.nome}">
                <input type="text" id="sigla" value="${obj.sigla}">
                <button id="btnCadastro">Alterar</button>
            `;
        }
    },

    afterRender( roteador ){
        let servicoCidade = new ServicoCidade( $ );
        let servicoArtista = new ServicoArtista( $ );

        let ctrlTelas = new ControladoraTelas( servicoCidade, servicoArtista, roteador );
        let ctrlCidade = new ControladoraCidade( servicoCidade, roteador, ctrlTelas );
        
        document.getElementById( 'btnCadastro' )
            .addEventListener( 'click', () => {

                var nome = $('#nome').val();
                var sigla = $('#sigla').val();
                var id = $('#id').val();

                var botao = document.getElementById('btnCadastro').innerHTML;
                
                try{
                    let cidade = new Cidade( nome, sigla );
                    if( botao == "Cadastrar"){
                        ctrlCidade.adicionarCidade( JSON.stringify( cidade ) );
                    }else{
                        if( botao == "Alterar"){
                            ctrlCidade.alterarCidade( JSON.stringify( cidade ), id );
                        }
                    }
                }catch( e ){
                    alert( e.message );
                }
            })

        // vai para tela home
        document.getElementById('back-home')
            .addEventListener('click', () => {
                ctrlTelas.goHome();
            })
    }
}

export default cadastroCidade;