'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Userbiodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Usergame)
    }
  }
  Userbiodata.init({
    fullname: DataTypes.STRING,
    address: DataTypes.STRING,
    age: DataTypes.INTEGER,
    hobby: DataTypes.STRING,
    UsergameId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Userbiodata',
  });
  return Userbiodata;
};