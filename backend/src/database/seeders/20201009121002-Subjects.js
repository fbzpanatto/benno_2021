module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('subjects', 
    [
      {
        subject_name: 'Matematica',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        subject_name: 'Portugues',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        subject_name: 'Historia',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        subject_name: 'Geografia',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        subject_name: 'Ciencias',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        subject_name: 'Artes',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        subject_name: 'Educacao Fisica',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        subject_name: 'Ingles',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        subject_name: 'PLPT',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('subjects', null, {});
  }
};