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
                <td>${p.id}</td>
                <td>${p.nome}</td>
                <td>${p.categoria}</td>
                <td>${p.ritmos}</td>
                <td>${p.cidade}</td>
                <td>${p.telefone}</td>
                <td>
                    <button id='edit'>Editar</button>
                    <button id='del'>Excluir</button>
                </td>          
            </tr>`;
        }

        for(let p of cidades){
            linhasTabelaCidades += 
            `<tr>
                <td>${p.id}</td>
                <td>${p.nome}</td>
                <td>${p.sigla}</td>
                <td>
                    <button id='editCidade'>Editar</button>
                    <button id='delCidade'>Excluir</button>
                </td>          
            </tr>`;
        }
        return `
            <h1>Artistas</h1>
            <table id="artistas">
                <thead>
                    <tr>
                        <th id="id" >Id</th>
                        <th>Nome</th>
                        <th>Sigla</th>
                        <th>Ritmos</th>
                        <th>Cidade</th>
                        <th>Telefone</th>
                        <th colspan=2>Operações</th>
                    </tr>
                </thead>
                <tbody>
                    `+ linhasTabelaArtistas +`
                </tbody>
            </table>

            <h1>Cidades</h1>
            <table id="artistas">
                <thead>
                    <tr>
                        <th id="id" >Id</th>
                        <th>Nome</th>
                        <th>Sigla</th>
                        <th colspan=2>Operações</th>
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