module.exports = class Pedido {
  static gravar(id, clienteId, dados, db) {
    db
      .put({
        TableName: "poc-gsl-pedidos",
        Item: {
          id: id,
          clienteId: clienteId
        }
      })
      .promise();
  }
  
  static obter(id, clienteId, db) {
    return db
            .get({
              TableName: "poc-gsl-pedidos",
              Key: {
                id: id,
                clienteId: clienteId
              }
            })
            .promise();
  }
  
  static listar(db) {
    return db.scan({ TableName: "poc-gsl-pedidos" }).promise();
  }
  
  static listarPorCliente(clienteId, db) {
    return db
            .get({
              TableName: "poc-gsl-pedidos",
              Key: {
                clienteId: clienteId
              }
            })
            .promise();
  }
  
  static remover(id, clienteId, db) {
    db
      .delete({
        TableName: "poc-gsl-pedidos",
        Key: {
          id: id,
          clienteId: clienteId
        }
      })
      .promise();
  }
}