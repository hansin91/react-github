'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favourite = sequelize.define('Favourite', {
    UserId: DataTypes.INTEGER,
    RepositoryId: DataTypes.INTEGER
  }, {});
  Favourite.associate = function(models) {
    // associations can be defined here
  };
  return Favourite;
};