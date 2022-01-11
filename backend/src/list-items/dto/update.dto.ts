import { ListItemsDto } from './list-items.dto';
import { PartialType } from '@nestjs/mapped-types';
export class UpdateListItemDto extends PartialType(ListItemsDto) {}
