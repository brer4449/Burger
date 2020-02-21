// Dependencies
// =============================================================
const db = require("../models");
// Routes
// =============================================================
module.exports = function(app) {
  // Get all burgers
  app.get("/api/burgers", function(req, res) {
    db.Burger.findAll({}).then(function(dbBurger) {
      // results are available to us inside the .then
      res.json(dbBurger);
    });
  });
  // Add a burger
  app.post("/api/burgers", function(req, res) {
    console.log(req.body);
    db.Burger.create({
      burgername: req.body.burger
    }).then(function(dbBurger) {
      console.log(dbBurger);
      // `results` here would be the newly created burger
      res.end();
    });
  });
};
