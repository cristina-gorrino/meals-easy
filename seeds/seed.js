const sequelize = require("../config/connection");
const {
  User,
  Category,
  Ingredients,
  OrderItem,
  Recipe,
  ShoppingCart,
} = require("../models");

const userData = require("./userData.json");
const categoryData = require("./categoryData.json");
const ingredientsData = require("./ingredientsData.json");
const orderItemData = require("./orderItemData.json");
const recipeData = require("./recipeData.json");
const shoppingCartData = require("./shoppingCartData.json");

const seedDatabase = async () => {
  console.log(typeof shoppingCartData, typeof shoppingCartData[0].customer_id);
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const category = await Category.bulkCreate(categoryData);
  const recipe = await Recipe.bulkCreate(recipeData);
  const ingredient = await Ingredients.bulkCreate(ingredientsData);

  for (const shoppingCart of shoppingCartData) {
    await ShoppingCart.create({
      ...shoppingCart,
      order_date: Date.now(),
    });
  }
  const orderItem = await OrderItem.bulkCreate(orderItemData);

  process.exit(0);
};

seedDatabase();
