const db = require("../models");

module.exports = app => {
  app.get("/", (req, res) => {
    db.Burger.findAll({}).then(function(dbBurger) {
      // results are available to us inside the .then
      res.render("index", { burgers: dbBurger });
    });
  });
};
