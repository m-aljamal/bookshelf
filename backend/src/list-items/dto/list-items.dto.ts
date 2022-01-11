import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class ListItemsDto {
  @IsNumber()
  rating: number = 0;

  @IsNumber()
  bookId: number;

  @IsString()
  notes: string = '';

  @IsOptional()
  finishDate: Date;
}
