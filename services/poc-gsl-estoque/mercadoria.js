module.exports = class Mercadoria {
  static gravar(id, fornecedorId, dados, db) {
    db
      .put({
        TableName: "poc-gsl-mercadorias",
        Item: {
          id: id,
          fornecedorId: fornecedorId,
          descricao: dados.descricao,
          codigoNCM: dados.codigoNCM,        
          codigoBarras: dados.codigoBarras,
          precoVenda: dados.precoVenda,
          precoImpostos: dados.impostos,
        }
      })
      .promise();
  }
  
  static obter(id, fornecedorId, db) {
    return db
            .get({
              TableName: "poc-gsl-mercadorias",
              Key: {
                id: id,
                fornecedorId: fornecedorId
              }
            })
            .promise();
  }
  
  static listar(db) {
    return db.scan({ TableName: "poc-gsl-mercadorias" }).promise();
  }
  
  static listarPorFornecedor(fornecedorId, db) {
    return db.scan({ 
      TableName: "poc-gsl-mercadorias",
      FilterExpression: 'fornecedorId = :fornecedorId',
      ExpressionAttributeValues: {
        ':fornecedorId': fornecedorId
      }
    }).promise();
  }
  
  static remover(id, fornecedorId, db) {
    db
      .delete({
        TableName: "poc-gsl-mercadorias",
        Key: {
          id: id,
          fornecedorId: fornecedorId
        }
      })
      .promise();
  }
}