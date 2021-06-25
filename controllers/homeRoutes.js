const router = require("express").Router();
const { Recipe, Category, User, OrderItem } = require("../models");
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
    res.redirect("/");
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
//withAuth middleware to prevent access to route
router.get("/checkout", withAuth, (req, res) => {
  if (!req.session.cart) {
    return res.redirect("/shop/shoppingCart");
  }
  const cart = new Cart(req.session.cart);
  // const errMsg = req.flash("error")[0];
  res.render("shop/checkout", {
    total: cart.totalPrice,
    // errMsg: errMsg,
    // noError: !errMsg,
  });
});

//Create a payment
router.get("/checkout", withAuth, (req, res) => {
  if (!req.session.cart) {
    return res.redirect("/shoppingCart");
  }
console.log (req.session.cart)
  const cart = new Cart(req.session.cart);
  console.log (`~~~~2${req.session.cart}`)

  const stripe = require("stripe")(
    "sk_test_51J5QHpFYy5pEztMBbW3clhuZh7nhBf0S87skmrJs239FrQjAUYjrEQcyjZK9OQSawKvCvKOYOdBSVyqG1wC0oj4b008sorCnvB"
  );

  // `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
  stripe.charges.create(
    {
      amount: cart.totalPrice * 100,
      currency: "usd",
      source: req.body.stripeToken,
      description: "Test Charge",
    },
    (err, charge) => {
      if (err) {
        // req.flash("error", err);
        return res.redirect("/checkout");
      }
      //create new order and place it in DB
      // let order = new OrderItem({
      //   user: req.User,
      //   cart: cart,
      //   address: req.body.address,
      //   name: req.body.name,
      //   paymentId: charge.id,
      // });
      // order.save((err, result) => {
      // req.flash("success", "Successfully payment made it!");
      //req.session.cart = null; //clear the cart
      res.redirect("/");
      // });
    }
  );
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
