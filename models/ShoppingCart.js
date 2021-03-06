const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ShoppingCart extends Model {}

ShoppingCart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    order_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "recipe",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "shopping_cart",
  }
);

module.exports = ShoppingCart;
