module.exports = class Estoque {
  static incluirMercadoria(depositoId, mercadoriaId, quantidade, db) {
    db
      .put({
        TableName: "poc-gsl-estoques",
        Item: {
          depositoId: depositoId,
          mercadoriaId: mercadoriaId,
          dataEntrada: Date.now(),
          quantidade: quantidade
        }
      })
      .promise();
  }
}