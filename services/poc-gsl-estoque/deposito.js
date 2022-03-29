module.exports = class Deposito {
  static gravar(id, dados, db) {
    db
      .put({
        TableName: "poc-gsl-depositos",
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
              TableName: "poc-gsl-depositos",
              Key: {
                id: id
              }
            })
            .promise();
  }
  
  static listar(db) {
    return db.scan({ TableName: "poc-gsl-depositos" }).promise();
  }
  
  static remover(id, db) {
    db
      .delete({
        TableName: "poc-gsl-depositos",
        Key: {
          id: id
        }
      })
      .promise();
  }
}