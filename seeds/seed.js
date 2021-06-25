const sequelize = require("../config/connection");
const {
  User,
  Category,
  Ingredients,
  Recipe,
  ShoppingCart,
} = require("../models");

const userData = require("./userData.json");
const categoryData = require("./categoryData.json");
const ingredientsData = require("./ingredientsData.json");
const recipeData = require("./recipeData.json");
const shoppingCartData = require("./shoppingCartData.json");

const seedDatabase = async () => {
  console.log(typeof shoppingCartData, typeof shoppingCartData[0].customer_id);
  //sync({ force: true }) -> dropping all tables if exist and then creating them but the seed file is not running.
  await sequelize.sync({ force: false });

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

  process.exit(0);
};

seedDatabase();
