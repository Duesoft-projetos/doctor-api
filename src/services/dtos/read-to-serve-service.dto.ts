import { IsNumber, IsOptional } from 'class-validator';

export class ReadToServeService {
  @IsNumber()
  @IsOptional()
  id: number;
}
