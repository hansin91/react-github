import {
  Table, CreatedAt,
  UpdatedAt, DataType, Column, Model, BelongsToMany, HasMany,
} from 'sequelize-typescript'
import { Repository } from './repository.entity'
import { Favourite } from './favourite.entity'

@Table({ tableName: 'Users' })
export class User extends Model<User> {

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: true,
  })
  avatar_url: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: true,
  })
  html_url: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Invalid format email',
      },
    },
  })
  email: string

  @Column
  following_url: string

  @Column
  followers_url: string

  @Column
  repos_url: string

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsToMany(() => Repository, () => Favourite)
  repositories: Repository[]

  @HasMany(() => Favourite)
  favourites: Favourite[]
}