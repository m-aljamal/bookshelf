import { User } from 'src/auth/entity/user.entity';
import { Book } from 'src/books/entity/book.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ListItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  rating: number;

  @Column({ default: '' })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  finishDate: Date;

  @ManyToOne(() => User, (user) => user.listItems)
  user: User;

  @ManyToOne(() => Book, (book) => book.listItems)
  book: Book;
}
