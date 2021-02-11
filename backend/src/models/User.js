const { Model, DataTypes } = require('sequelize')

class User extends Model {
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
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    }, {
      sequelize: connection,
      tableName: 'users',
    })
  }

  static associate(models) {
    this.belongsTo(models.Person, {foreignKey: 'person_id', as: 'person'})
    this.hasOne(models.Permission, {foreignKey: 'person_id', as: 'permission'})
  }
}

module.exports = User 