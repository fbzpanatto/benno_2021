const { Model, DataTypes } = require('sequelize')

class Teacher extends Model {
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
        }, {
            sequelize: connection,
            tableName: 'teachers'
        })
    }

    static associate(models) {
        this.belongsTo(models.Cicle, { foreignKey: 'cicle_id', as: 'cicle' })
        this.belongsTo(models.Person, { foreignKey: 'person_id', as: 'person'})
        this.belongsToMany(models.Subject, {
            foreignKey: 'person_id',
            through: 'teacher_subjects',
            as: 'subjects'
        })
    }
}

module.exports = Teacher 