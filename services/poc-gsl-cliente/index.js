const ClienteBPM = require('./clienteBPM.js');

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };  

  try {
    switch (event.routeKey) {
      case "POST /api/v1/clientes/{id}/solicitacoes":
        body = await ClienteBPM.criarSolicitacao(JSON.parse(event.body));
        break;
          
      default:
        throw new Error(`Rota inválida: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};