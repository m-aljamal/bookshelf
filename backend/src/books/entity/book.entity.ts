import { User } from 'src/auth/entity/user.entity';
import { ListItems } from 'src/list-items/entity/list-items.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  coverImageUrl: string;

  @Column()
  pageCount: number;

  @Column()
  publisher: string;

  @Column()
  synopsis: string;

  @OneToMany(() => ListItems, (listItems) => listItems.book)
  listItems: ListItems[];
}
