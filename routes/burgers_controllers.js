// Dependencies
// =============================================================
const db = require("../models");
// Routes
// =============================================================
module.exports = function(app) {
  // Get all burgers
  app.get("/api/burgers", function(req, res) {
    let results = [];

    db.Burger.findAll({}).then(function(dbBurger) {
      //console.log(dbBurger[0].dataValues);
      dbBurger.forEach(item => results.push(item));
      // results are available to us inside the .then
      //res.json(dbBurger);

      //results.forEach(item => console.log(item));

      res.render("index", { allBurgers: results });
    });
  });
  // Add a burger
  app.post("/api/burgers", function(req, res) {
    console.log("************");
    console.log(req.body);
    console.log("************");
    db.Burger.create({
      burgername: req.body.burger
    }).then(function(dbBurger) {
      console.log(dbBurger);
      // `results` here would be the newly created burger
      res.redirect("/api/burgers");
    });
  });
};
