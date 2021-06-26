const router = require("express").Router();
const { Recipe } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      ...req.body,
      id: req.session.id,
    });

    res.status(200).json(newRecipe);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
