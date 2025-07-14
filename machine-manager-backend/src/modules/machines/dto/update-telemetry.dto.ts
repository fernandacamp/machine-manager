import { IsEnum, IsOptional, IsString } from 'class-validator';
import { MachineStatus } from '../../../common/enums/machine-status.enum';

export class UpdateTelemetryDto {
  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsEnum(MachineStatus)
  status?: MachineStatus;
}
