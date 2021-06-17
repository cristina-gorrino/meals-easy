const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Category extends Model {}

Category.init({
  Category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  Recipe_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sequelize,
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: "user",
});

module.exports = User;
