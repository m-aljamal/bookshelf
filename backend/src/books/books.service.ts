import { BookDto } from './dto/book.dto';
import { Book } from './entity/book.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entity/user.entity';
import * as bookData from './books-data.json';
@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private repository: Repository<Book>) {}

  createBook(body: BookDto) {
    const book = this.repository.create(body);
    return this.repository.save(book);
  }

  getBooks(query: string) {
    return this.repository
      .createQueryBuilder('book')
      .where('book.title like :query', { query: `%${query}%` })
      .getMany();
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
