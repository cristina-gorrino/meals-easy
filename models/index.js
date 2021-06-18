const User = require("./User");
const Category = require("./Category");
const Ingredients = require("./Ingredients");
const Recipe = require("./Recipe");
const OrderItem = require("./OrderItem");
const ShoppingCart = require("./ShoppingCart");

Category.hasMany(Recipe, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE'
});

Recipe.belongsTo(Category, {
    foreignKey: 'category_id'
});

Recipe.hasMany(Ingredients, {
    foreignKey: 'recipe_id',
    onDelete: 'CASCADE'
});

Ingredients.belongsTo(Recipe, {
    foreignKey: 'recipe_id'
});

OrderItem.hasMany(Recipe, {
    foreignKey: 'recipe_id',
    onDelete: 'CASCADE'
});

Recipe.belongsTo(OrderItem, {
    foreignKey: 'recipe_id'
});

ShoppingCart.hasMany(OrderItem, {
    foreignKey: 'shopping_cart_id',
    onDelete: 'CASCADE'
});

OrderItem.belongsTo(ShoppingCart, {
    foreignKey: 'shopping_cart_id'
});

User.hasMany(ShoppingCart, {
    foreignKey: 'customer_id',
    onDelete: 'CASCADE'
});
ShoppingCart.belongsTo(User, {
    foreignKey: 'customer_id'
});

module.exports = {User, Category, Ingredients, OrderItem, Recipe, ShoppingCart};
