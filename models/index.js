const User = require("./User");
const Category = require("./category");
const Ingredients = require("./Ingredients");
const Recipe = require("./Recipe");
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

User.hasMany(ShoppingCart, {
    foreignKey: 'customer_id',
    onDelete: 'CASCADE'
});
ShoppingCart.belongsTo(User, {
    foreignKey: 'customer_id'
});

module.exports = {User, Category, Ingredients, Recipe, ShoppingCart};
