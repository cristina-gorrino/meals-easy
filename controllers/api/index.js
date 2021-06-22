const router = require("express").Router();
// const userRoutes = require('./userRoutes');
const recipeRoutes = require("./recipeRoutes");

// router.use('/users', userRoutes);
router.use("/shoppingCart", recipeRoutes);

module.exports = router;
