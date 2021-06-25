const router = require("express").Router();
const userRoutes = require('./userRoutes');
const recipeRoutes = require("./recipeRoutes");
const shoppingCartRoutes = require("./ShoppingCartRoutes");
const emailRoutes = require("./emailRoutes")

router.use('/users', userRoutes);
router.use("/shoppingCart", shoppingCartRoutes);
router.use("/recipe", recipeRoutes);
router.use("/email", emailRoutes);

module.exports = router;
