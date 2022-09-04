'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usergame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Userbiodata)
      this.hasMany(models.UsergameHistory)
    }
  }
  Usergame.init({
    username: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Usergame',
  });
  return Usergame;
};