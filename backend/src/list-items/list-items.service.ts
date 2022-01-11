import { UpdateListItemDto } from './dto/update.dto';
import { ListItems } from 'src/list-items/entity/list-items.entity';
import { ListItemsDto } from './dto/list-items.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/auth/entity/user.entity';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class ListItemsService {
  constructor(
    @InjectRepository(ListItems) private repository: Repository<ListItems>,
    private readonly bookService: BooksService,
  ) {}

  async createListItem(listItem: ListItemsDto, user: User) {
    const book = await this.bookService.getBook(listItem.bookId);
    const findListItem = await this.repository.findOne({
      where: { user, book },
    });
    if (findListItem) {
      throw new BadRequestException('List item already exists');
    }
    const newList = this.repository.create({ ...listItem, book, user });
    return this.repository.save(newList);
  }

  async getAllListItems() {
    return this.repository.find({ relations: ['book', 'user'] });
  }

  async getUserListItems(userId: number) {
    return this.repository.find({
      where: { user: { id: userId } },
      relations: ['book', 'user'],
    });
  }

  async deleteListItem(id: number, user: User) {
    const listItem = await this.repository.findOne({
      where: { id, user },
    });
    if (!listItem) {
      throw new BadRequestException('List item does not exist');
    }
    return this.repository.delete(id);
  }

  async updateListItem(id: number, body: UpdateListItemDto, user: User) {
    const listItem = await this.repository.findOne({
      where: { id, user },
    });
    if (!listItem) {
      throw new BadRequestException('List item does not exist');
    }

    const updatedListItem = this.repository.merge(listItem, body);
    return this.repository.save(updatedListItem);
  }
}
