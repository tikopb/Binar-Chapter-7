'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_game_fights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user_game_fights.init({
    description: DataTypes.STRING,
    roomNumber: DataTypes.INTEGER,
    ply_1_id: DataTypes.INTEGER,
    ply_2_id: DataTypes.INTEGER,
    ply_1_choose: DataTypes.STRING,
    ply_2_choose: DataTypes.STRING,
    rounde:DataTypes.INTEGER,
    winner_user_id:DataTypes.INTEGER
  }, 
  {
    sequelize,
    modelName: 'user_game_fights',
  });
  return user_game_fights;
};