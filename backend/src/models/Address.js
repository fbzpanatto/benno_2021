const { Model, DataTypes } = require('sequelize')

class Address extends Model {
  static init(connection) {
    super.init({
      zipcode: DataTypes.STRING,
      street: DataTypes.STRING,
      number: DataTypes.STRING,
      neighborhood: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
    }, {
      sequelize: connection,
      tableName: 'addresses'
    })
  }

  static associate(models) {
    this.belongsTo(models.Person, { foreignKey: 'person_id', as: 'person' })
  }
}

module.exports = Address 