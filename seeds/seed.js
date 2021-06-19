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

  // await userData();
  // await categoryData();
  // await ingredientsData();
  // await orderItemData();
  // await recipeData();
  // await shoppingCartData();
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const category = await Category.bulkCreate(categoryData);
  const ingredient = await Ingredients.bulkCreate(ingredientsData);
  const orderItem = await OrderItem.bulkCreate(orderItemData);
  const recipe = await Recipe.bulkBuild(recipeData);
  const shoppingCart = await ShoppingCart.bulkCreate(shoppingCartData);
  // for (const category of categoryData) {
  //   await Category.create({
  //     ...category,
  //   });
  // }
  // for (const ingredient of ingredientsData) {
  //   await Ingredients.create({
  //     ...ingredient,
  //   });
  // }
  // for (const orderItem of orderItemData) {
  //   await OrderItem.create({
  //     ...orderItem,
  //   });
  // }
  // for (const recipe of recipeData) {
  //   await Recipe.create({
  //     ...recipe,
  //   });
  // }

  // for (const shoppingCart of shoppingCartData) {
  //   await ShoppingCart.create({
  //     ...shoppingCart,
  //     order_date: Date.now(),
  //   });
  // }

  process.exit(0);
};

seedDatabase();
