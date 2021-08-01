'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'user_games', 
      'email', Sequelize.STRING,
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('user_games', 'email')
  }
};
