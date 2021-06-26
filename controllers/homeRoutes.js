const router = require("express").Router();
const { Recipe, Category, User, Ingredients } = require("../models");
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
    console.log(`~~req.session.cart2:`);
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
  console.log(`~~ cart.generateArray:`);
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

// TODO: Figure out how to use these routes to reroute stripe. Else, make these static pages
router.get('/success', (req, res) => {
  try {
    res.render("shop/success", {logged_in: req.session.logged_in})
  } catch (err) {
    res.status(500).json(err);
  }
  
});
router.get('/cancel', (req, res) => {
  try {
    res.render("shop/cancel", {logged_in: req.session.logged_in,})
  } catch (err) {
    res.status(500).json(err);
  }
  
});

//Create payment
router.post("/create-checkout-session", withAuth, async (req, res) => {
  if (!req.session.cart) {
    return res.redirect("/shop/shoppingCart");
  }
  console.log(`~~req.session.cart:`)
  console.log(req.session.cart);

  const stripe = require("stripe")(
    //z"sk_test_51J5QHpFYy5pEztMBbW3clhuZh7nhBf0S87skmrJs239FrQjAUYjrEQcyjZK9OQSawKvCvKOYOdBSVyqG1wC0oj4b008sorCnvB"
    "sk_test_51J6TmYEPrS6QhBr8YdIRKooTCzguY78wSredfkqvQnB9yFwOZlf7DfKX8m86N0ZqEFNZgdZXF5FlIwjpKN0zFRjU00XB9pPmid"
  );
  // console.log(req.session.cart.items.toString(2).item_name);
  console.log(Object.values(req.session.cart.items)[0].item_name);
  const items = Object.values(req.session.cart.items);  
  var line_items = [];
  for (var i=0; i< items.length; i++) {
    var product = {
      price_data: {
        currency: "usd",
        product_data: {
          name: items[i].item_name,
          images: ["https://i.imgur.com/EHyR2nP.png"],
        },
        unit_amount: Math.round(items[i].unit_price *100),  
      },
      quantity: items[i].quantity,
    };
  }
  line_items.push(product);
  console.log(line_items);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: line_items,
    mode: "payment",
    success_url: 'http://localhost:3002/success',
    cancel_url: 'http://localhost:3002/cancel',
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
