const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

const Cliente = require('./cliente.js');
const Pedido = require('./pedido.js');

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };
  const geradorId = context.awsRequestId;

  try {
    switch (event.routeKey) {
      // CRUD CLIENTES
      case "POST /api/v1/clientes":
        await Cliente.gravar(geradorId, JSON.parse(event.body), dynamo);
        body = `Cliente criado com sucesso.`;
        break;
       case "POST /api/v1/clientes/{id}/pedidos":
        await Pedido.gravar(geradorId, event.pathParameters.id, JSON.parse(event.body), dynamo);
        body = `Pedido criado com sucesso.`;
        break;
      case "GET /api/v1/clientes":
        body = await Cliente.listar(dynamo);
        break;
      case "GET /api/v1/clientes/{id}":
        body = await Cliente.obter(event.pathParameters.id, dynamo);
        break;
      case "GET /api/v1/clientes/{id}/pedidos":
        body = await Pedido.listarPorCliente(event.pathParameters.id, dynamo);
        break;
      case "GET /api/v1/clientes/{clienteId}/pedidos/{pedidoId}":
        body = await Pedido.obter(event.pathParameters.pedidoId,
                                  event.pathParameters.clienteId,
                                  dynamo);
        break;
      case "PUT /api/v1/clientes/{id}":
        await Pedido.gravar(event.pathParameters.id, JSON.parse(event.body), dynamo);
        body = `Cliente atualizado com sucesso.`;
        break;
      case "PUT /api/v1/clientes/{clienteId}/pedidos/{pedidoId}":
        await Pedido.gravar(event.pathParameters.pedidoId,
                            event.pathParameters.clienteId, 
                            JSON.parse(event.body), 
                            dynamo);
        body = `Pedido atualizado com sucesso.`;
        break;
      case "DELETE /api/v1/clientes/{id}":
        await Cliente.remover(event.pathParameters.id, dynamo);
        body = `Cliente removido com sucesso.`;
        break;
      case "DELETE /api/v1/clientes/{clienteId}/pedidos/{pedidoId}":
        await Pedido.remover(event.pathParameters.pedidoId,
                             event.pathParameters.clienteId,
                             dynamo);
        body = `Pedido removido com sucesso.`;
        break;
        
      // CRUD PEDIDOS
      case "GET /api/v1/pedidos":
        body = await Pedido.listar(dynamo);
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