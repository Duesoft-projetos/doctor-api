import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReasonCancellationAppointment {
  @IsString()
  @IsNotEmpty()
  description: string;
}
