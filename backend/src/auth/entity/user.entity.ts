import { ListItems } from './../../list-items/entity/list-items.entity';
import { Book } from './../../books/entity/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => ListItems, (listItems) => listItems.user)
  listItems: ListItems[];
}
