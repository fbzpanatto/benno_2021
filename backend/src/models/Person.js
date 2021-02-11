const { Model, DataTypes } = require('sequelize')

class Person extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,

        }, {
            sequelize: connection,
            tableName: 'persons'
        })
    }

    static associate(models) {
        this.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' })
        // this.belongsTo(models.Class, {foreignKey: 'class_id', as: 'class'})
        this.hasOne(models.Student, { foreignKey: 'person_id', as: 'student' })
        this.hasOne(models.Teacher, { foreignKey: 'person_id', as: 'teacher' })
        this.hasMany(models.Address, { foreignKey: 'person_id', as: 'addresses' })
        this.hasMany(models.Phone, { foreignKey: 'person_id', as: 'phones' })
        this.hasOne(models.User, { foreignKey: 'person_id', as: 'user' })
        this.hasOne(models.Personal_info, {foreignKey: 'person_id', as: 'documents'})
        //TODO
        // this.hasOne(models.Gestao, {foreignKey: 'pessoa_id', as: 'gestores'})
        // this.hasOne(models.Administrativo, {foreignKey: 'pessoa_id', as: 'administrativos'})
        // this.hasOne(models.Terceirizado, {foreignKey: 'pessoa_id', as: 'terceirizados'})
    }
}

module.exports = Person 