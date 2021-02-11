module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', 
    [
      {
        name: 'Alunos',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Professores',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Gestores',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Funcionarios Administrativos',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Terceirizados',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  }
};