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
          codigoBarrasTipo: dados.codigoBarrasTipo,
          codigoBarrasValor: dados.codigoBarrasValor,
          precoVenda: dados.precoVenda,
          impostos: dados.impostos,
        }
      })
      .promise();
  }
  
  static obter(id, db) {
    return db
            .get({
              TableName: "poc-gsl-mercadorias",
              Key: {
                id: id
              }
            })
            .promise();
  }
  
  static listar(db) {
    return db.scan({ TableName: "poc-gsl-mercadorias" }).promise();
  }
  
  static listarPorFornecedor(fornecedorId, db) {
    return db
            .get({
              TableName: "poc-gsl-mercadorias",
              Key: {
                fornecedorId: fornecedorId
              }
            })
            .promise();
  }
  
  static remover(id, db) {
    db
      .delete({
        TableName: "poc-gsl-mercadorias",
        Key: {
          id: id, db
        }
      })
      .promise();
  }
}