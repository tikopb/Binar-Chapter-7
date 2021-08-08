'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  class user_game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    
    static #encrypt = (password) => bcrypt.hashSync(password, 10)
    
    static register = ({username, password, isAdmin, email}) => { 
      const encryptedPassword = this.#encrypt(password);
      return this.create({ username, password: encryptedPassword, isAdmin, email:email });
    }
    
    checkpassword = password => bcrypt.compareSync(password, this.password);
    
    generateToken = () => {
      const payload = {
        id: this.id,
        username: this.username
      }
      const secretKey = "affan123"
      const token = jwt.sign(payload, secretKey);
      return token;
    }
    
    static authenticate = async ({ username, password }) => {
      try {
        console.log(username)
        const user = await this.findOne({ where: { username }})
        if(!user) return Promise.reject("User not found")
        
        const isPasswordValid = user.checkpassword(password)
        if(!isPasswordValid) return Promise.reject("Wrong password")
        
        return Promise.resolve(user)
      } catch (error) {
        return Promise.reject(err)
      }
      
    }
  };
  user_game.init({
    username: DataTypes.STRING,
    password: DataTypes.TEXT,
    isactive: DataTypes.BOOLEAN,
    isAdmin: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_game',
  });
  return user_game;
};