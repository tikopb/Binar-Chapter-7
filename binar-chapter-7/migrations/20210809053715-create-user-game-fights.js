'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_game_fights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      roomNumber: {
        type: Sequelize.INTEGER
      },
      ply_1_id: {
        type: Sequelize.INTEGER
      },
      ply_2_id: {
        type: Sequelize.INTEGER
      },
      ply_1_choose: {
        type: Sequelize.STRING
      },
      ply_2_choose: {
        type: Sequelize.STRING
      },
      rounde:{
        type: Sequelize.INTEGER
      },
      winner_user_id:{
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_game_fights');
  }
};