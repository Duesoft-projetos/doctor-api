import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CancelAppointmentDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @Expose({ name: 'reason_cancellation_id' })
  @IsNumber()
  @IsNotEmpty()
  reasonCancellationId: number;

  @Expose({ name: 'description_cancellation' })
  @IsString()
  @IsOptional()
  descriptionCancellation?: string;
}
