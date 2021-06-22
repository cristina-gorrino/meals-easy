const router = require("express").Router();
const userRoutes = require('./userRoutes');
const recipeRoutes = require("./recipeRoutes");
const shoppingCartRoutes = require("./ShoppingCartRoutes");

router.use('/users', userRoutes);
router.use("/shoppingCart", shoppingCartRoutes);
router.use("/recipe", recipeRoutes);

module.exports = router;
