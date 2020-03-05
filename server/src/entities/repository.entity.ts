import {
  Table, CreatedAt,
  UpdatedAt, DataType,
  Column, Model, BelongsToMany,
  HasMany,
} from 'sequelize-typescript'
import { User } from './user.entity'
import { Favourite } from './favourite.entity'

@Table({ tableName: 'Repositories' })
export class Repository extends Model<Repository> {

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  github_id: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  url: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  owner: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  owner_url: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  avatar_url: string

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsToMany(() => User, () => Favourite)
  users: User[]

  @HasMany(() => Favourite)
  favourites: Favourite[]
}