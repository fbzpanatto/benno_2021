const { Model, DataTypes } = require('sequelize')

class Permission extends Model {
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
            crud_persons: DataTypes.BOOLEAN,
            crud_grades: DataTypes.BOOLEAN,
            crud_classes: DataTypes.BOOLEAN,
            crud_periods: DataTypes.BOOLEAN,
        }, {
            sequelize: connection,
            tableName: 'permissions'
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'person_id', as: 'user' })
    }
}

module.exports = Permission 