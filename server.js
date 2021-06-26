const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const expressHbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

//
// if (process.env.NODE_ENV != "production") {
//   require("dotenv").config({ path: "./.env" });
// }
// const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
// const stripe = process.env.STRIPE_PUBLIC_KEY;

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();

//app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3002;

// Set up Handlebars.js engine with custom helpers
const hbs = expressHbs.create({ helpers, extname: ".hbs" });

const sess = {
  secret: "Super secret secret",
  cookie: { maxAge: 180 * 60 * 1000 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// // Inform Express.js on which template engine to use
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
