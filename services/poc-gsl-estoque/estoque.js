module.exports = class Estoque {
  static adicionarMercadoria(depositoId, mercadoriaId, quantidade, db) {
    db
      .put({
        TableName: "poc-gsl-estoques",
        Item: {
          depositoId: depositoId,
          mercadoriaId: mercadoriaId,
          operacao: 'ENTRADA',
          quantidade: quantidade,
          data: Date.now()
        }
      })
      .promise();
  }
  static removerMercadoria(depositoId, mercadoriaId, quantidade, db) {
    db
      .put({
        TableName: "poc-gsl-estoques",
        Item: {
          depositoId: depositoId,
          mercadoriaId: mercadoriaId,
          operacao: 'SAIDA',
          quantidade: quantidade,
          data: Date.now()
        }
      })
      .promise();
  }
}