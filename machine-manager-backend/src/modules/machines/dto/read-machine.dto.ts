import { MachineStatus } from '../../../common/enums/machine-status.enum';

export class ReadMachineDto {
  id: string;
  name: string;
  location: string;
  status: MachineStatus;
}
