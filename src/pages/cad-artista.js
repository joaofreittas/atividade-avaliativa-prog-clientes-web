import { Roteador } from "../roteador.js";
import { ServicoArtista } from "../servico-artista.js";
import * as jQuery from '../jquery.js';
import { ControladoraArtista } from "../controladora-artista.js";
import { Artista } from "../artista-model.js";
import { ServicoCidade } from "../servico-cidade.js";
import { ControladoraTelas } from "../controladora-telas.js";

let cadastroArtista = {

    render( data, obj){

        //para cadastro
        if( obj == undefined || obj == null || obj == ""){
            let cidades;
            for(let c of data){
                cidades +=
                `
                    <option value="${c.sigla}">${c.nome}</opdtion>
                `;
            }

            return `
                <button id="back-home">Home</button>
                <h3>Cadastro de Artistas</h3>
                <input type="text" id="nome" placeholder=" Nome ">
                <select id="categoria">
                    <option id="opcao-banda" value="Banda">Banda</option>
                    <option id="opcao-cantor" value="Cantor">Cantor</option>
                </select>
                <textarea id="ritmos"></textarea>
                <select id="cidades">
                    `+ cidades +`
                </select>
                <input type="text" id="telefone" placeholder=" Telefone ">
                <button id="btnCadastro">Cadastrar</button>
            `;    
        //para editar
        }else{
            let cid;
            for(let c of data){
                cid +=
                `
                    <option value="${c.sigla}">${c.nome}</option>
                `;
            }
            return `
                <button id="back-home">Home</button>
                <h3>Cadastro de Artistas</h3>
                <input type="hidden" id="id" value="${obj.id}">
                <input type="text" id="nome" value="${obj.nome}">
                <select id="categoria">
                    <option id="opcao-banda" value="Banda">Banda</option>
                    <option id="opcao-cantor" value="Cantor">Cantor</option>
                </select>
                <textarea id="ritmos">${obj.ritmos}</textarea>
                <select id="cidades">
                    `+ cid +`
                </select>
                <input type="text" id="telefone" value="${obj.telefone}">
                <button id="btnCadastro">Alterar</button>
            `;
        }
        
    },

    afterRender( roteador ){
        let servicoCidade = new ServicoCidade( $ );
        let servicoArtista = new ServicoArtista( $ );

        let ctrlTelas = new ControladoraTelas( servicoCidade, servicoArtista, roteador );
        let ctrlArtista = new ControladoraArtista( servicoArtista, roteador, ctrlTelas );

        document.getElementById('btnCadastro')
            .addEventListener('click', () => {

            var nome = $('#nome').val();
            var cat = $('#categoria').val();
            var ritmos = $('#ritmos').val();
            var cidade = $('#cidades').val();
            var tel = $('#telefone').val();
            var id = $('#id').val();

            var botao = document.getElementById('btnCadastro').innerHTML;
            try{
                var artista = new Artista( nome, cat, ritmos, cidade, tel );
                if( botao == "Cadastrar"){
                    ctrlArtista.adicionarArtista( JSON.stringify( artista ) );
                }else{
                    if( botao == "Alterar" ){
                        ctrlArtista.alterarArtista( JSON.stringify( artista ), id );
                    }
                }
            }catch( e ){
                alert( e.message );
            }
                
            })

        //ir para home
        document.getElementById('back-home')
            .addEventListener('click', () => {
                ctrlTelas.goHome();
            })
    }
}

export default cadastroArtista;