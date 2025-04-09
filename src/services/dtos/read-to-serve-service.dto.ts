import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReadToServeService {
  @Transform(({ value }) => !isNaN(Number(value)) ? value.toString() : value)
  @IsString()
  @IsNotEmpty()
  office: string;
}
