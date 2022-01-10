import { BooksModule } from './../books/books.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ListItemsController } from './list-items.controller';
import { ListItemsService } from './list-items.service';
import { ListItems } from './entity/list-items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ListItems]), AuthModule, BooksModule],
  controllers: [ListItemsController],
  providers: [ListItemsService],
})
export class ListItemsModule {}
