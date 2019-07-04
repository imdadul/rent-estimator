/*  eslint-disable @typescript-eslint/explicit-member-accessibility*/
import { Model, Column, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript';
@Table
export class Rent extends Model<Rent> {
  @Column
  apartment_id!: string;

  @Column
  zip_code!: string;

  @Column
  apartment_type!: string;

  @Column
  apartment_size!: number;

  @Column
  rent!: number;

  @Column
  deleted!: boolean;

  @Column
  birthday?: Date;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
