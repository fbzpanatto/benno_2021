const { Model, DataTypes } = require('sequelize')

class Grade extends Model {
  static init(connection) {
    super.init({
      grade: DataTypes.FLOAT(2, 2),
      absences: DataTypes.INTEGER(2)
    }, {
      sequelize: connection,
      tableName: 'grades'
    })
  }

  static associate(models) {
    this.belongsTo(models.Period, { foreignKey: 'period_id', as: 'periods' })
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' })
    this.belongsTo(models.Subject, { foreignKey: 'subject_id', as: 'subject' })
  }
}

module.exports = Grade 