const sequelize = require('../config/connection');
const {User, Category, Ingredients, OrderItem, Recipe, ShoppingCart} = require('../models');

const userData = require('./userData.json');
const categoryData = require('./categoryData.json');
const ingredientsData = require('./ingredientsData.json');
const orderItemData = require('./orderItemData.json');
const recipeData = require('./recipeData.json');
const shoppingCartData = require('./shoppingcartData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const category of categoryData) {
    await Category.create({
      ...category,
    });
  }
  for (const ingredient of ingredientsData) {
    await Ingredients.create({
      ...ingredient,
    });
  }
  for (const orderItem of orderItemData) {
    await OrderItem.create({
      ...orderItem,
    });
  }
  for (const recipe of recipeData) {
    await Recipe.create({
      ...recipe,
    });
  }

  for (const shoppingCart of shoppingCartData) {
    await ShoppingCart.create({
      ...shoppingCart,
      order_date: Date.now(),
    });
  }

  process.exit(0);
};

seedDatabase();
