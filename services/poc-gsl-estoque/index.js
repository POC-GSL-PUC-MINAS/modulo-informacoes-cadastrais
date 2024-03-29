const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

const Deposito = require('./deposito.js');
const Estoque = require('./estoque.js');
const Fornecedor = require('./fornecedor.js');
const Mercadoria = require('./mercadoria.js');

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };
  const geradorId = context.awsRequestId;

  try {
    switch (event.routeKey) {
      // CRUD DEPÓSITO
      case "POST /api/v1/depositos":
        await Deposito.gravar(geradorId, JSON.parse(event.body), dynamo);
        body = `Depósito criado com sucesso.`;
        break;
      case "GET /api/v1/depositos":
        body = await Deposito.listar(dynamo);
        break;
      case "GET /api/v1/depositos/{id}":
        body = await Deposito.obter(event.pathParameters.id, dynamo);
        break;
      case "PUT /api/v1/depositos/{id}":
        await Deposito.gravar(event.pathParameters.id, JSON.parse(event.body), dynamo);
        body = `Depósito atualizado com sucesso.`;
        break;
      case "DELETE /api/v1/depositos/{id}":
        await Deposito.remover(event.pathParameters.id, dynamo);
        body = `Depósito removido com sucesso.`;
        break;
      case "POST /api/v1/depositos/{depositoId}/mercadorias/{mercadoriaId}/adicionar":
        var requestJSON = JSON.parse(event.body)
        await Estoque.adicionarMercadoria(event.pathParameters.depositoId,
                                          event.pathParameters.mercadoriaId, 
                                          requestJSON.quantidade, 
                                          dynamo);
        body = `Mercadoria adicionada com sucesso.`;
        break;
      case "POST /api/v1/depositos/{depositoId}/mercadorias/{mercadoriaId}/remover":
          var requestJSON = JSON.parse(event.body)
          await Estoque.removerMercadoria(event.pathParameters.depositoId,
                                          event.pathParameters.mercadoriaId, 
                                          requestJSON.quantidade, 
                                          dynamo);
          body = `Mercadoria removida com sucesso.`;
          break;
      
      // CRUD FORNECEDORES
      case "POST /api/v1/fornecedores":
        await Fornecedor.gravar(geradorId, JSON.parse(event.body), dynamo);
        body = `Fornecedor criado com sucesso.`;
        break;
       case "POST /api/v1/fornecedores/{id}/mercadorias":
        await Mercadoria.gravar(geradorId, event.pathParameters.id, JSON.parse(event.body), dynamo);
        body = `Mercadoria criada com sucesso.`;
        break;
      case "GET /api/v1/fornecedores":
        body = await Fornecedor.listar(dynamo);
        break;
      case "GET /api/v1/fornecedores/{id}":
        body = await Fornecedor.obter(event.pathParameters.id, dynamo);
        break;
      case "GET /api/v1/fornecedores/{id}/mercadorias":
        body = await Mercadoria.listarPorFornecedor(event.pathParameters.id, dynamo);
        break;
      case "GET /api/v1/fornecedores/{fornecedorId}/mercadorias/{mercadoriaId}":
        body = await Mercadoria.obter(event.pathParameters.mercadoriaId,
                                      event.pathParameters.fornecedorId,
                                      dynamo);
        break;
      case "PUT /api/v1/fornecedores/{id}":
        await Fornecedor.gravar(event.pathParameters.id, JSON.parse(event.body), dynamo);
        body = `Fornecedor atualizado com sucesso.`;
        break;
      case "PUT /api/v1/fornecedores/{fornecedorId}/mercadorias/{mercadoriaId}":
        await Mercadoria.gravar(event.pathParameters.mercadoriaId,
                                event.pathParameters.fornecedorId,
                                JSON.parse(event.body),
                                dynamo);
        body = `Mercadoria atualizada com sucesso.`;
        break;
      case "DELETE /api/v1/fornecedores/{id}":
        await Fornecedor.remover(event.pathParameters.id, dynamo);
        body = `Fornecedor removido com sucesso.`;
        break;
      case "DELETE /api/v1/fornecedores/{fornecedorId}/mercadorias/{mercadoriaId}":
        await Mercadoria.remover(event.pathParameters.mercadoriaId,
                                event.pathParameters.fornecedorId,
                                dynamo);
        body = `Mercadoria removida com sucesso.`;
        break;
        
      // CRUD MERCADORIAS
      // TODO: Fazer todas as rotas caberem dentro de /api/v1/fornecedores
      case "GET /api/v1/mercadorias":
        body = await Mercadoria.listar(dynamo);
        break;

      case "GET /api/v1/mercadorias/{id}":
        body = await Mercadoria.obter(event.pathParameters.id, dynamo);
        break;
      case "PUT /api/v1/mercadorias/{id}":
        await Mercadoria.gravar(event.pathParameters.id, JSON.parse(event.body), dynamo);
        body = `Mercadoria atualizada com sucesso.`;
        break;
      case "DELETE /api/v1/mercadorias/{id}":
        await Mercadoria.remover(event.pathParameters.id, dynamo);
        body = `Mercadoria removida com sucesso.`;
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