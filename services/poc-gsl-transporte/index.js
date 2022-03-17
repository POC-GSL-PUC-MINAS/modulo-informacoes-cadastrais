const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

const Transportadora = require('./transportadora.js');
const Veiculo = require('./veiculo.js');

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };
  const geradorId = context.awsRequestId;

  try {
    switch (event.routeKey) {
      // CRUD TRANSPORTADORAS
      case "POST /api/v1/transportadoras":
        await Transportadora.gravar(geradorId, JSON.parse(event.body), dynamo);
        body = `Transportadora criada com sucesso.`;
        break;
       case "POST /api/v1/transportadoras/{id}/veiculos":
        await Veiculo.gravar(geradorId, event.pathParameters.id, JSON.parse(event.body), dynamo);
        body = `Veículo criado com sucesso.`;
        break;
      case "GET /api/v1/transportadoras":
        body = await Transportadora.listar(dynamo);
        break;
      case "GET /api/v1/transportadoras/{id}":
        body = await Transportadora.obter(event.pathParameters.id, dynamo);
        break;
      case "GET /api/v1/transportadoras/{id}/veiculos":
        body = await Veiculo.listarPorTransportadora(event.pathParameters.id, dynamo);
        break;
      case "GET /api/v1/transportadoras/{transportadoraId}/veiculos/{veiculoId}":
        body = await Veiculo.obter(event.pathParameters.veiculoId,
                                   event.pathParameters.transportadoraId,
                                   dynamo);
        break;
      case "PUT /api/v1/transportadoras/{id}":
        await Transportadora.gravar(event.pathParameters.id, JSON.parse(event.body), dynamo);
        body = `Transportadora atualizada com sucesso.`;
        break;
      case "PUT /api/v1/transportadoras/{transportadoraId}/veiculos/{veiculoId}":
        await Veiculo.gravar(event.pathParameters.veiculoId,
                             event.pathParameters.transportadoraId, 
                             JSON.parse(event.body), 
                             dynamo);
        body = `Veículo atualizado com sucesso.`;
        break;
      case "DELETE /api/v1/transportadoras/{id}":
        await Transportadora.remover(event.pathParameters.id, dynamo);
        body = `Transportadora removida com sucesso.`;
        break;
      case "DELETE /api/v1/transportadoras/{transportadoraId}/veiculos/{veiculoId}":
        await Veiculo.remover(event.pathParameters.veiculoId,
                              event.pathParameters.transportadoraId,
                              dynamo);
        body = `Transportadora removida com sucesso.`;
        break;
        
        
      // CRUD VEÍCULOS
      case "GET /api/v1/veiculos":
        body = await Veiculo.listar(dynamo);
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