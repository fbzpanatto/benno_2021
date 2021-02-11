const { Model, DataTypes } = require('sequelize')

class Category extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: 'categories'
        })
    }

    static associate(models) {
        this.hasMany(models.Person, { foreignKey: 'category_id', as: 'persons' })

    }
}

module.exports = Category 