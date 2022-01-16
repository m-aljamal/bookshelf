import { BookDto } from './dto/book.dto';
import { Book } from './entity/book.entity';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bookData from './books-data.json';
import { ListItemsService } from 'src/list-items/list-items.service';
import { User } from 'src/auth/entity/user.entity';
@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private repository: Repository<Book>,
    @Inject(forwardRef(() => ListItemsService))
    private readonly listItemsService: ListItemsService,
  ) {}

  createBook(body: BookDto) {
    const book = this.repository.create(body);
    return this.repository.save(book);
  }

  async getBooks(query: string, user: User) {
    if (query) {
      return this.repository
        .createQueryBuilder('book')
        .where('LOWER(book.title) like :query', { query: `%${query}%` })
        .getMany();
    }
    const userBooks = await this.listItemsService.getUserListItems(user.id);
    const userBooksIds = userBooks.length
      ? userBooks.map((book) => book.book.id)
      : [3, 4, 5];

    const books = await this.repository
      .createQueryBuilder('book')
      .where('book.id NOT IN (:...books)', { books: userBooksIds })
      .take(10)
      .getMany()

    return books;
  }

  getBook(id: number) {
    return this.repository.findOne(id);
  }

  seedBooks() {
    const books = bookData.map((book: BookDto) => {
      const newBook = this.repository.create(book);
      return this.repository.save(newBook);
    });
    return Promise.all(books);
  }
  deleteBook(id: number) {
    return this.repository.delete(id);
  }
}
