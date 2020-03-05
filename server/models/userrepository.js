'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRepository = sequelize.define('UserRepository', {
    UserId: DataTypes.INTEGER,
    RepositoryId: DataTypes.INTEGER
  }, {});
  UserRepository.associate = function(models) {
    // associations can be defined here
  };
  return UserRepository;
};