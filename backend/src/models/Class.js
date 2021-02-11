const { Model, DataTypes } = require('sequelize')

class Class extends Model {
  static init(connection) {
    super.init({
      class_name: DataTypes.STRING
    }, {
      sequelize: connection,
      tableName: 'classes'
    })
  }

  static associate(models) {
    this.hasMany(models.Student, { foreignKey: 'class_id', as: 'students' })
  }
}

module.exports = Class 