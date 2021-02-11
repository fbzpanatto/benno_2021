const { Model, DataTypes } = require('sequelize')

class Period extends Model {
  static init(connection) {
    super.init({
      period_name: DataTypes.STRING,
    }, {
      sequelize: connection,
      tableName: 'periods'
    })
  }

  static associate(models) {
    this.hasMany(models.Grade, { foreignKey: 'period_id', as: 'classes' })
  }
}

module.exports = Period 