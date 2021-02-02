import { IsNumber, IsOptional, IsString } from 'class-validator';
export class MovieDataDTO {
  @IsString() readonly title: string;
  @IsOptional() @IsString() readonly description: string;
  @IsNumber() readonly year: number;
  @IsOptional() @IsString({ each: true }) readonly genres: string[];
}
