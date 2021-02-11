const { Model, DataTypes } = require('sequelize')

class Subject extends Model {
  static init(connection) {
    super.init({
      subject_name: DataTypes.STRING,
    }, {
      sequelize: connection,
      tableName: 'subjects'
    })
  }

  static associate(models) {
    this.hasMany(models.Grade, {foreignKey: 'subject_id', as: 'grade'})
    this.belongsToMany(models.Teacher, {
      through: 'teacher_subjects',
      foreignKey: 'subject_id',
      as: 'teachers'
    })
  }
}

module.exports = Subject 