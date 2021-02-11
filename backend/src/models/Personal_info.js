const { Model, DataTypes } = require('sequelize')

class Personal_info extends Model {
  static init(connection) {
    super.init({
      person_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
        references: {
          model: 'persons',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      rg: DataTypes.STRING,
      cpf: DataTypes.STRING,
      email: DataTypes.STRING
    }, {
      sequelize: connection,
      tableName: 'personal_information',
    })
  }

  static associate(models) {
    this.belongsTo(models.Person, {foreignKey: 'person_id', as: 'person'})
  }
}

module.exports = Personal_info 