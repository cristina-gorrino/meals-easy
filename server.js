const express = require("express");
const session = require("express-session");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const expressHbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();

//app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

// // res.locals is an object passed to hbs engine
// app.use((req, res, next) => {
//   res.locals.session = req.session;
//   next();
// });

//TEMPORARY
// const index = require("./routes/index");
// app.use(index);

// To begin using node-mysql-admin
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
