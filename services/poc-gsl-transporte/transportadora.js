module.exports = class Transportadora {
  static gravar(id, dados, db) {
    db
      .put({
        TableName: "poc-gsl-transportadoras",
        Item: {
          id: id,
          cnpj: dados.cnpj,
          razaoSocial: dados.razaoSocial,
          nomeFantasia: dados.nomeFantasia,
          status: dados.status,
          rua: dados.rua,
          numeroRua: dados.numeroRua,
          complemento: dados.complemento,
          bairro: dados.bairro,
          cep: dados.cep,
          cidade: dados.cidade,
          estado: dados.estado,
          pais: dados.pais,
          latitude: dados.latitude,
          longitude: dados.longitude,
          email: dados.email,
          telefone: dados.telefone
        }
      })
      .promise();
  }
  
  static obter(id, db) {
    return db
            .get({
              TableName: "poc-gsl-transportadoras",
              Key: {
                id: id
              }
            })
            .promise();
  }
  
  static listar(db) {
    return db.scan({ TableName: "poc-gsl-transportadoras" }).promise();
  }
  
  static remover(id, db) {
    db
      .delete({
        TableName: "poc-gsl-transportadoras",
        Key: {
          id: id, db
        }
      })
      .promise();
  }
}