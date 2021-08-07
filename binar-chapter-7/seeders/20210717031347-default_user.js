'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_games', 
  [
    {
      username: 'admin',
      password: 'admin',
      isactive: true,
      isAdmin: true,
      description: 'deafult user for access admin page',
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'admin@mail.com'
    },
    {
      username: 'player1',
      password: '1234',
      isactive: true,
      isAdmin: false,
      description: 'deafult user for access admin player1',
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'player1@mail.com'
    },
    {
      username: 'player2',
      password: '1234',
      isactive: true,
      isAdmin: false,
      description: 'deafult user for access admin player2',
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'player2@mail.com'
    }
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_games', null, {});
  }
};
