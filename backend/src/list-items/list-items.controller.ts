import { UpdateListItemDto } from './dto/update.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ListItemsDto } from './dto/list-items.dto';
import { ListItemsService } from './list-items.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/auth/entity/user.entity';

@Controller('list-items')
export class ListItemsController {
  constructor(private readonly listItemService: ListItemsService) {}

  @UseGuards(AuthGuard())
  @Post()
  createListItem(@Body() body: ListItemsDto, @CurrentUser() user: User) {
    return this.listItemService.createListItem(body, user);
  }

  @Get()
  getAllListItems() {
    return this.listItemService.getAllListItems();
  }

  @UseGuards(AuthGuard())
  @Get('/user')
  getUserListItems(@CurrentUser() user: User) {
    return this.listItemService.getUserListItems(user.id);
  }

  @UseGuards(AuthGuard())
  @Delete('/:id')
  deleteListItem(@Param('id') id: string, @CurrentUser() user: User) {
    return this.listItemService.deleteListItem(+id, user);
  }

  @UseGuards(AuthGuard())
  @Put('/:id')
  updateListItem(
    @Param('id') id: number,
    @Body() body: UpdateListItemDto,
    @CurrentUser() user: User,
  ) {
    return this.listItemService.updateListItem(+id, body, user);
  }
}
