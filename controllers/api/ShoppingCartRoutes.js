const router = require("express").Router();
const { ShoppingCart } = require("../../models");

router.get("/products/:id", (req, res) => {
  const product = ShoppingCart.products.find((x) => x.id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

router.get("/products", (req, res) => {
  res.send(ShoppingCart.products);
});

router.get("/", (req, res) => {
  res.send("Server is ready");
});
module.exports = router;
