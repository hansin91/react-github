'use strict';
module.exports = (sequelize, DataTypes) => {
  const Repository = sequelize.define('Repository', {
    github_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    url: DataTypes.TEXT,
    owner: DataTypes.STRING,
    owner_url: DataTypes.TEXT,
    avatar_url: DataTypes.TEXT
  }, {});
  Repository.associate = function(models) {
    // associations can be defined here
  };
  return Repository;
};