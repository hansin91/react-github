import { sequelize } from './sequelize'

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      return sequelize
    },
  },
]
