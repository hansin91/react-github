import {
  Table, CreatedAt,
  UpdatedAt, DataType, Column, Model, ForeignKey, BelongsTo,
} from 'sequelize-typescript'
import { User } from './user.entity';
import { Repository } from './repository.entity';

@Table({ tableName: 'Favourites' })
export class Favourite extends Model<Favourite> {

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number

  @ForeignKey(() => Repository)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  RepositoryId: number

  @BelongsTo(() => Repository)
  repository: Repository

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  UserId: number

  @BelongsTo(() => User)
  user: User
}