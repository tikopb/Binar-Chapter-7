'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_games', [{
      username: 'admin',
      password: 'admin',
      isactive: true,
      isAdmin: true,
      description: 'deafult user for access admin page',
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'admin@mail.com'
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_games', null, {});
  }
};
