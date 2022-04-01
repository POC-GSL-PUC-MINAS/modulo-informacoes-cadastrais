const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

const Cliente = require('./cliente.js');
const ClienteBPM = require('./clienteBPM.js');

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };  
  const geradorId = context.awsRequestId;

  try {
    switch (event.routeKey) {
      case "POST /api/v1/clientes":
        await Cliente.gravar(geradorId, JSON.parse(event.body), dynamo);
        body = `Cliente criado com sucesso.`;
        break;
      case "GET /api/v1/clientes":
        body = await Cliente.listar(dynamo);
        break;
      case "GET /api/v1/clientes/{id}":
        body = await Cliente.obter(event.pathParameters.id, dynamo);
        break;
      case "PUT /api/v1/clientes/{id}":
        await Cliente.gravar(event.pathParameters.id, JSON.parse(event.body), dynamo);
        body = `Cliente atualizado com sucesso.`;
        break;
      case "DELETE /api/v1/clientes/{id}":
        await Cliente.remover(event.pathParameters.id, dynamo);
        body = `Cliente removido com sucesso.`;
        break;
      case "POST /api/v1/clientes/{id}/solicitacoes":
        body = await ClienteBPM.criarSolicitacao(event.pathParameters.id, JSON.parse(event.body));
        break;
      case "GET /api/v1/clientes/{id}/solicitacoes":
        body = await ClienteBPM.listarSolicitacoes();
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