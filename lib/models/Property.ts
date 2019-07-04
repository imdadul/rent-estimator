/*  eslint-disable @typescript-eslint/explicit-member-accessibility*/
import {Model, Column, Table, CreatedAt, UpdatedAt} from 'sequelize-typescript';
@Table
export class Property extends Model<Property> {
  @Column({primaryKey: true,field:'apartment_id'})
  apartmentId!: string;

  @Column({field:'zip_code'})
  zipCode!: number;

  @Column({field:'apartment_type'})
  apartmentType!: string;

  @Column({field:'apartment_size'})
  apartmentSize!: number;

  @Column
  rent!: number;

  @Column
  deleted!: boolean;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}