const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class OrderItem extends Model {}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subtotal_price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    shopping_cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "shopping_cart",
        key: "id",
      },
    },
    //Dependency chain: ingredient -> recipe -> order_item => recipe
    // recipe_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: "recipe",
    //     key: "id",
    //   },
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "order_item",
  }
);

module.exports = OrderItem;
