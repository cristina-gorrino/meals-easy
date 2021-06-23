const router = require("express").Router();
const { Recipe, Category, User } = require("../models");
const withAuth = require("../utils/auth");

/** Get home page */
router.get("/", async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      include:
        [{model: Category}]
    });
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

    res.render("homepage", {
      recipes,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

//Add product to Cart
router.get("/add-to-cart/:id", (req, res) => {
  const recipeId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});

  Recipe.findAll(recipeId, (err, recipe) => {
    if (err) {
      return res.redirect("homepage");
    }
    cart.add(recipe, recipe.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect("homepage");
  });
});

//Shopping Cart view
router.get("/shoppingCart", (req, res) => {
  if (!req.session.cart) {
    return res.render("shop/shoppingCart", { recipes: null });
  }
  const cart = new Cart(req.session.cart);
  res.render("shop/shoppingCart", {
    recipes: cart.generateArray(),
    totalPrice: cart.totalPrice,
  });
});
// // Use withAuth middleware to prevent access to route
// router.get("/profile", withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ["password"] },
//       include: [{ model: Recipe }],
//     });

//     const user = userData.get({ plain: true });

//     res.render("homepage", {
//       ...user,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/homepage");
    return;
  }

  res.render("login");
});
module.exports = router;
