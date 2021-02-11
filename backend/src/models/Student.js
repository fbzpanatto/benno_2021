const { Model, DataTypes } = require('sequelize')

class Student extends Model {
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
            ra: DataTypes.STRING
        }, {
            sequelize: connection,
            tableName: 'students'
        })
    }

    static associate(models) {
        this.belongsTo(models.Person, { foreignKey: 'person_id', as: 'person'})
        this.belongsTo(models.Class, {foreignKey: 'class_id', as: 'class'})
        this.hasMany(models.Grade, {foreignKey: 'student_id', as: 'grades'})
    }
}

module.exports = Student 