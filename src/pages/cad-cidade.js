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
                <button id="back-home"><i class="material-icons">home</i></button>
                <div class="container">
                    <h3>Cadastro de Cidades</h3>
                    <label class="mt-3" for="nome">Nome</label>
                    <input type="text" id="nome" class="form-control" placeholder=" Nome ">
                    <label class="mt-3" for="sigla">Sigla</label>
                    <input type="text" id="sigla" class="form-control" placeholder=" Sigla ">
                    <button id="btnCadastro" class="btn btn-primary mt-3" >Cadastrar</button>
                </div>
            `;
        }else{
            return `
            <button id="back-home"><i class="material-icons">home</i></button>
                <div class="container">
                    <h3>Cadastro de Cidades</h3>
                    <input type="hidden" id="id" value="${obj.id}">
                    <input type="text" id="nome" value="${obj.nome}">
                    <input type="text" id="sigla" value="${obj.sigla}">
                    <button id="btnCadastro" class="btn btn-primary mt-3" >Alterar</button>
                </div>
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