import * as jQuery from '../jquery.js';
import { ControladoraTelas } from '../controladora-telas.js';
import { ControladoraArtista } from '../controladora-artista.js';
import { ServicoCidade } from '../servico-cidade.js';
import { ServicoArtista } from '../servico-artista.js';
import { ControladoraCidade } from '../controladora-cidade.js';
const listaArtistas = {
    
    render( artistas, cidades){
        var linhasTabelaArtistas;
        var linhasTabelaCidades;
        for(let p of artistas){
            linhasTabelaArtistas += 
            `<tr>
                <td scope="row">${p.id}</td>
                <td scope="row">${p.nome}</td>
                <td scope="row">${p.categoria}</td>
                <td scope="row">${p.ritmos}</td>
                <td scope="row">${p.cidade}</td>
                <td scope="row">${p.telefone}</td>
                <td scope="row">
                    <button id='edit' class="btn btn-success">Editar</button>
                    <button id='del' class="btn btn-danger">Excluir</button>
                </td>          
            </tr>`;
        }

        for(let p of cidades){
            linhasTabelaCidades += 
            `<tr>
                <td scope="row" >${p.id}</td>
                <td scope="row" >${p.nome}</td>
                <td scope="row" >${p.sigla}</td>
                <td scope="row" >
                    <button id='editCidade' class="btn btn-success" >Editar</button>
                    <button id='delCidade' class="btn btn-danger" >Excluir</button>
                </td>          
            </tr>`;
        }
        return `
            <h3>Artistas</h3>
            <table id="artistas" class="table">
                <thead>
                    <tr>
                        <th id="id" scope="col" >Id</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Sigla</th>
                        <th scope="col">Ritmos</th>
                        <th scope="col">Cidade</th>
                        <th scope="col">Telefone</th>
                        <th scope="col" colspan=2>Operações</th>
                    </tr>
                </thead>
                <tbody>
                    `+ linhasTabelaArtistas +`
                </tbody>
            </table>

            <h3>Cidades</h3>
            <table id="artistas" class="table">
                <thead>
                    <tr>
                        <th scope="col" id="id" >Id</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Sigla</th>
                        <th scope="col" colspan=2>Operações</th>
                    </tr>
                </thead>
                <tbody>
                    `+ linhasTabelaCidades +`
                </tbody>
            </table>
            
        `;
    },

    afterRender( roteador ){
        let servicoCidade = new ServicoCidade( $ );
        let servicoArtista = new ServicoArtista( $ );

        let ctrlTelas = new ControladoraTelas( servicoCidade, servicoArtista, roteador );
        let ctrlArtista = new ControladoraArtista( servicoArtista, roteador, ctrlTelas );
        let ctrlCidade = new ControladoraCidade( servicoCidade, roteador, ctrlTelas );

        // evento deletar artista
        $("body").on('click', '#del', function(){
            let tdoobj = $(this).closest('tr').find('td');
            let id = tdoobj[0].innerHTML;
            ctrlArtista.excluirArtista( id );
        });

        //evento editar artista
        $("body").on('click', '#edit', function(){
            let tdoobj = $(this).closest('tr').find('td');
            let id = tdoobj[0].innerHTML;

            ctrlArtista.buscarPorId( id )
                .then( ( response ) => {
                ctrlTelas.goCadastroArtista( response );
            }).catch( ( response ) =>{
                console.log( response );
            })
        });

        // evento deletar cidade
        $("body").on('click', '#delCidade', function(){
            let tdoobj = $(this).closest('tr').find('td');
            let id = tdoobj[0].innerHTML;
            console.log( id );
            ctrlCidade.excluirCidade( id );

        });

        //evento editar cidade
        $("body").on('click', '#editCidade', function(){
            let tdoobj = $(this).closest('tr').find('td');
            let id = tdoobj[0].innerHTML;

            ctrlCidade.buscarPorId( id )
                .then( ( response ) => {
                ctrlTelas.goCadastroCidade( response );
            }).catch( ( response ) =>{
                console.log( response );
            })
        });
    }
}

export default listaArtistas;