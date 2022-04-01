const fetch = require('node-fetch');

const token = '';

module.exports = class ClienteBPM {
  static async criarSolicitacao(clienteId, dados) {
    const query4 = 'mutation ($myItemName: String!, $columnValues: JSON!, $boardId: Int!) { create_item (board_id:$boardId, item_name:$myItemName, column_values: $columnValues) { id } }';
    const vars = {
      "myItemName" : `Cliente ${clienteId}`,
      "columnValues": `{\"long_text\":\"${dados.descricao}\", \"status_1\": "${dados.prioridade}"}`,
      "boardId": 2447142298
    };
    
    /*const idGrupo = 'topics';
    const solicitacao = dados.texto;
    const query = `mutation { create_item (board_id: ${idQuadro}, group_id: \"${idGrupo}\", item_name: \"${solicitacao}\") { id }}`;*/

    await fetch ("https://api.monday.com/v2", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : token
      },
      body: JSON.stringify({
        'query' : query4,
        'variables' : JSON.stringify(vars)
      })
      })
    .then(res => res.json())
    .then(res => console.log(JSON.stringify(res, null, 2)));
  }
  static async listarSolicitacoes() {
     let query = `query { items () { 
       id, 
       name
       state
       column_values {
        id
        title
        value
        text
        additional_info
       }
     }}`;
     
     /*let query = `query ($board: [Int]) {
      boards (ids: $board){
        columns{
          id
          title
          type
        }
      }
    }`*/
    
    return await fetch ("https://api.monday.com/v2", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : token
      },
      body: JSON.stringify({
        query : query
      })
      })
    .then(res => res.json())
    //.then(res => JSON.stringify(res, null, 2));
  }
}