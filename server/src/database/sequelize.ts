import { Sequelize } from 'sequelize-typescript'
import { User, Repository, Favourite } from '../entities'

export const sequelize = new Sequelize({
  repositoryMode: true,
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'abc12345',
  database: 'github-info',
  models: [User, Repository, Favourite],
})