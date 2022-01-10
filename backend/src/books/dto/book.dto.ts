import { IsString, IsNumber } from 'class-validator';

export class BookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  coverImageUrl: string;

  @IsNumber()
  pageCount: number;

  @IsString()
  publisher: string;

  @IsString()
  synopsis: string;
}
