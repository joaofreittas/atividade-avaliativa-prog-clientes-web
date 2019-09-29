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
                <button id="back-home"><i class="material-icons">home</i></button>
                <div class="container mt-3 w-80"> 
                    <h3>Cadastro de Artistas</h3>
                    <label class="mt-2" for="nome">Nome</label>
                    <input type="text" id="nome" class="form-control" placeholder=" Nome ">
                    <label class="mt-2" for="categoria">Categoria</label>
                    <select id="categoria" class="custom-select">
                        <option id="opcao-banda" value="Banda">Banda</option>
                        <option id="opcao-cantor" value="Cantor">Cantor</option>
                    </select>
                    <label class="mt-2" for="ritmos">Ritmos</label>
                    <textarea id="ritmos" class="form-control"></textarea>
                    <label class="mt-2" for="cidades">Cidade</label>
                    <select id="cidades" class="custom-select ">
                        `+ cidades +`
                    </select>
                    <label class="mt-2" for="telefone">Telefone</label>
                    <input type="text" id="telefone" class="form-control" placeholder=" Telefone ">
                    <button id="btnCadastro" class="btn btn-primary mt-3">Cadastrar</button>
                </div>
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
                <button id="back-home"><i class="material-icons">home</i></button>
                <div class="container mt-3 w-80"> 
                    <h3>Cadastro de Artistas</h3>
                    <label class="mt-2" for="nome">Nome</label>
                    <input type="hidden" id="id" value="${obj.id}">
                    <input type="text" id="nome" class="form-control" value="${obj.nome}" placeholder=" Nome ">
                    <label class="mt-2" for="categoria">Categoria</label>
                    <select id="categoria" class="custom-select">
                        <option id="opcao-banda" value="Banda">Banda</option>
                        <option id="opcao-cantor" value="Cantor">Cantor</option>
                    </select>
                    <label class="mt-2" for="ritmos" >Ritmos</label>
                    <textarea id="ritmos" class="form-control">${obj.ritmos}</textarea>
                    <label class="mt-2" for="cidades">Cidade</label>
                    <select id="cidades" class="custom-select ">
                        `+ cid +`
                    </select>
                    <label class="mt-2" for="telefone">Telefone</label>
                    <input type="text" id="telefone" class="form-control" value="${obj.telefone}" placeholder=" Telefone ">
                    <button id="btnCadastro" class="btn btn-primary mt-3">Alterar</button>
                </div>
                
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