const router = require("express").Router();
const { Recipe, Category, User } = require("../models");
const withAuth = require("../utils/auth");
const Cart = require("../models/Cart");

/** Get home page */
router.get("/", async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      include: [{ model: Category }],
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

//Add Item to Cart
router.get("/add-to-cart/:id", async (req, res) => {
  try {
    const recipeId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    const recipeData = await Recipe.findByPk(recipeId);

    const recipe = recipeData.get({ plain: true });
    cart.add(recipe, recipe.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
});

//Shopping Cart view
router.get("/shoppingCart", (req, res) => {
  //check if cart exist
  if (!req.session.cart) {
    return res.render("shop/shoppingCart", { recipes: null });
  }

  const cart = new Cart(req.session.cart);
  console.log(cart.generateArray());
  res.render("shop/shoppingCart", {
    recipes: cart.generateArray(),
    totalPrice: cart.totalPrice,
  });
});

//Checkout
router.get("/checkout", withAuth, (req, res) => {
  if (!req.session.cart) {
    return res.redirect("/shop/shoppingCart");
  }
  const cart = new Cart(req.session.cart);
  res.render("shop/checkout", {
    total: cart.totalPrice,
  });
});

//Create payment
router.post("/create-checkout-session", withAuth, async (req, res) => {
  if (!req.session.cart) {
    return res.redirect("/shop/shoppingCart");
  }
  console.log(req.session.cart);
  const cart = new Cart(req.session.cart);

  const stripe = require("stripe")(
    "sk_test_51J5QHpFYy5pEztMBbW3clhuZh7nhBf0S87skmrJs239FrQjAUYjrEQcyjZK9OQSawKvCvKOYOdBSVyqG1wC0oj4b008sorCnvB"
  );
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Stubborn Attachments",
            images: ["https://i.imgur.com/EHyR2nP.png"],
          },
          unit_amount: cart.totalPrice * 100,
        },
        quantity: cart.totalQty,
      },
    ],
    mode: "payment",
    success_url: res.render("shop/success"),
    cancel_url: res.render("shop/cancel"),
  });
  res.json({ id: session.id });
});

// Get a specific Recipe by id
router.get("/recipe/:id", async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: Ingredients,
        },
      ],
    });
    const recipe = recipeData.get({ plain: true });
    res.render("recipe", {
      ...recipe,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/homepage");
    return;
  }

  res.render("login");
});
module.exports = router;
