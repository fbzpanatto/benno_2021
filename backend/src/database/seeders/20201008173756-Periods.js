module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('periods', 
    [
      {
        period_name: '1BIM',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        period_name: '2BIM',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        period_name: '3BIM',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        period_name: '4BIM',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('periods', null, {});
  }
};