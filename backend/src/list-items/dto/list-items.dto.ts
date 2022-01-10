import { IsNumber, IsString } from 'class-validator';

export class ListItemsDto {
  rating: number;

  @IsNumber()
  bookId: number;

  notes: string;
}
