const fetch = require('node-fetch');

module.exports = class ClienteBPM {
  static async criarSolicitacao(dados) {
    const idQuadro = '2447142298';
    const idGrupo = 'topics';
    const solicitacao = dados.texto;
    const query = `mutation { create_item (board_id: ${idQuadro}, group_id: \"${idGrupo}\", item_name: \"${solicitacao}\") { id }}`;

    const token = '';

    await fetch ("https://api.monday.com/v2", {
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
    .then(res => console.log(JSON.stringify(res, null, 2)));
  }
}