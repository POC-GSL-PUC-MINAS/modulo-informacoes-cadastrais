module.exports = class Veiculo {
  static gravar(id, transportadoraId, dados, db) {
    db
      .put({
        TableName: "poc-gsl-veiculos",
        Item: {
          id: id,
          transportadoraId: transportadoraId,
          chassi: dados.chassi,
          renavam: dados.renavam,
          placa: dados.placa,
          marca: dados.marca,
          modelo: dados.modelo,
          ano: dados.ano,
          cor: dados.cor,
          combustivel: dados.combustivel
        }
      })
      .promise();
  }
  
  static obter(id, transportadoraId, db) {
    return db
            .get({
              TableName: "poc-gsl-veiculos",
              Key: {
                 id: id,
                 transportadoraId: transportadoraId
              }
            })
            .promise();
  }
  
  static listar(transportadoraId, db) {
    return db
            .get({
              TableName: "poc-gsl-veiculos",
              Key: {
                transportadoraId: transportadoraId
              }
            })
            .promise();
  }
  
  static async remover(id, transportadoraId, db) {
    db
      .delete({
        TableName: "poc-gsl-veiculos",
        Key: {
          id: id,
          transportadoraId: transportadoraId
        }
      })
      .promise();
  }
}