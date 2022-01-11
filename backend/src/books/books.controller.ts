import { AuthGuard } from '@nestjs/passport';
import { BookDto } from './dto/book.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/auth/entity/user.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  createBook(@Body() body: BookDto) {
    return this.booksService.createBook(body);
  }

  @UseGuards(AuthGuard())
  @Get('/:id')
  getBook(@Param('id') id: string) {
    return this.booksService.getBook(+id);
  }

  @Get()
  getbooks(@Query('query') query: string) {
    return this.booksService.getBooks(query);
  }

  @Post('/seed')
  seedBooks() {
    return this.booksService.seedBooks();
  }

  @Delete('/:id')
  deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBook(+id);
  }
}
