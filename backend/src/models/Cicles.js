const { Model, DataTypes } = require('sequelize')

class Cicle extends Model {
    static init(connection) {
        super.init({
            ciclecol: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: 'cicles'
        })
    }

    static associate(models) {
        this.hasMany(models.Teacher, { foreignKey: 'cicle_id', as: 'teachers' })
    }
}

module.exports = Cicle 