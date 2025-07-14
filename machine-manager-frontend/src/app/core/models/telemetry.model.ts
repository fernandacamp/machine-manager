import { MachineStatus } from "../enums/status-machine.enum";

export interface Telemetry {
  location: string;
  status: MachineStatus;
}