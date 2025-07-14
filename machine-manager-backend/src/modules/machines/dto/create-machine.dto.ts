import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MachineStatus } from '../../../common/enums/machine-status.enum';

export class CreateMachineDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  location: string;

  @IsEnum(MachineStatus)
  status: MachineStatus;
}
