'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsergameHistory extends Model {
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
  UsergameHistory.init({
    game: DataTypes.STRING,
    score: DataTypes.INTEGER,
    rank: DataTypes.STRING,
    UsergameId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UsergameHistory',
  });
  return UsergameHistory;
};