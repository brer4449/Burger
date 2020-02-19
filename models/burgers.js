module.exports = function(sequelize, Datatypes) {
  const Burger = sequelize.define("Burger", {
    burgername: Datatypes.STRING
  });

  sequelize.sync({ force: true }).then(function() {
    Burger.create({
      burgername: "Veggie Burger"
    }),
      Burger.create({
        burgername: "Big Mac"
      });
  });
  return Burger;
};
