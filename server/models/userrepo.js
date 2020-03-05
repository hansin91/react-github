'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRepo = sequelize.define('UserRepo', {
    UserId: DataTypes.INTEGER,
    RepositoryId: DataTypes.INTEGER
  }, {});
  UserRepo.associate = function(models) {
    // associations can be defined here
  };
  return UserRepo;
};