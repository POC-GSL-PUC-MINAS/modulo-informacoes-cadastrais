module.exports = class Fornecedor {
  static gravar(id, dados, db) {
    db
      .put({
        TableName: "poc-gsl-fornecedores",
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
              TableName: "poc-gsl-fornecedores",
              Key: {
                id: id
              }
            })
            .promise();
  }
  
  static listar(db) {
    return db.scan({ TableName: "poc-gsl-fornecedores" }).promise();
  }
  
  static remover(id, db) {
    db
      .delete({
        TableName: "poc-gsl-fornecedores",
        Key: {
          id: id
        }
      })
      .promise();
  }
}