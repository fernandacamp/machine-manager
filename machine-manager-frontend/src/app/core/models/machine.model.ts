import { MachineStatus } from "../enums/status-machine.enum";


export interface Machine {
  id?: string;
  name: string;
  location: string;
  status: MachineStatus;
}
