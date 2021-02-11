module.exports = (objectOfModels, connection) => {
  function initModels(objectOfModels) {
    for (model in objectOfModels) {
      objectOfModels[model].init(connection)
    }
  }
  function associateModels(objectOfModels) {
    for (model in objectOfModels) {
      objectOfModels[model].associate(connection.models)
    }
  }
  initModels(objectOfModels)
  associateModels(objectOfModels)
}