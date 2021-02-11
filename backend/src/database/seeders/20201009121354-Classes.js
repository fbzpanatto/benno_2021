module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('classes', 
    [
      {
        class_name: '1A',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_name: '1B',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_name: '2A',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_name: '2B',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_name: '3A',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_name: '3B',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_name: '4A',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_name: '4B',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_name: '5A',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_name: '6A',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_name: '7A',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_name: '8A',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        class_name: '9A',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('classes', null, {});
  }
};