// Dependencies
// =============================================================
const db = require("../models/index");
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
      name: req.body.name
    }).then(function(dbBurger) {
      console.log(dbBurger);
      // `results` here would be the newly created burger
      res.end();
    });
  });
  app.get("/ap/:model/:id", function(req, res) {
    const modelName = req.params.model;
    db[modelName].findOne({
      where: {
        id: req.params.id
      }
    });
  });

  /*
  app.get("/", function(req, res) {
    res.json(path.join(__dirname, "public/index.html"));
  });
  */

  app.get("/ap/:model/", function(req, res) {
    const modelName = req.params.model;
    db[modelName].findAll({});
  });
};

// // Dependencies
// // =============================================================
// const db = require("../models");
// // Routes
// // =============================================================
// module.exports = function(app) {
//   // Get all chirps
//   app.get("/api/todos", function(req, res) {
//     db.Todo.findAll({}).then(function(dbTodo) {
//       // results are available to us inside the .then
//       res.json(dbTodo);
//     });
//   });
//   // Add a todo
//   app.post("/api/todos", function(req, res) {
//     console.log(req.body);
//     db.Todo.create({
//       text: req.body.text,
//       complete: req.body.complete
//     }).then(function(dbTodo) {
//       console.log(dbTodo);
//       // `results` here would be the newly created todo
//       res.end();
//     });
//   });
// };

// app.get("/ap/:model/:id", function(req, res) {
//   const modelName = req.params.model;
//   db[modelName].findOne({
//     where: {
//       id: req.params.id
//     }
//   });
// });

// app.get("/ap/:model/", function(req, res) {
//   const modelName = req.params.model;
//   db[modelName].findAll({});
// });
