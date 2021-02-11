const { Model, DataTypes } = require('sequelize')

class Phone extends Model {
    static init(connection) {
        super.init({
            number: DataTypes.STRING,
            complement: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: 'phones'
        })
    }

    static associate(models) {
        this.belongsTo(models.Person, { foreignKey: 'person_id', as: 'person'})
    }
}

module.exports = Phone 