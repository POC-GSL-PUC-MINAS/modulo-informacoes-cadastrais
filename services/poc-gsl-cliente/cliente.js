module.exports = class Cliente {
  static gravar(id, dados, db) {
    db
      .put({
        TableName: "poc-gsl-clientes",
        Item: {
          id: id,
          cnpj: dados.cnpj,
          razaoSocial: dados.razaoSocial,
          nomeFantasia: dados.nomeFantasia,
          email: dados.email,
          telefone: dados.telefone,
          endereco: dados.endereco,
          situacao: dados.situacao         
        }
      })
      .promise();
  }
  
  static obter(id, db) {
    return db
            .get({
              TableName: "poc-gsl-clientes",
              Key: {
                id: id
              }
            })
            .promise();
  }
  
  static listar(db) {
    return db.scan({ TableName: "poc-gsl-clientes" }).promise();
  }
  
  static remover(id, db) {
    db
      .delete({
        TableName: "poc-gsl-clientes",
        Key: {
          id: id
        }
      })
      .promise();
  }
}