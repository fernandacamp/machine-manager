import { Component, Input, OnInit } from '@angular/core';
import { MachineStatus } from '../../../core/enums/status-machine.enum';

@Component({
  selector: 'app-machine-status',
  standalone: true,
  imports: [],
  templateUrl: './machine-status.component.html',
  styleUrl: './machine-status.component.css'
})
export class MachineStatusComponent implements OnInit {

  @Input() status!: MachineStatus;
  statusValue: string = '';
  translateStatus: string = '';

   private statusTranslations: { [key in MachineStatus]: string } = {
    [MachineStatus.OPERATING]: 'Operando',
    [MachineStatus.MAINTENANCE]: 'Parada para manuntenção',
    [MachineStatus.OFF]: 'Desligada'
  };

  ngOnInit(): void {
    this.statusValue = MachineStatus[this.status].toLowerCase();
    this.translateStatus = this.statusTranslations[this.status] || 'Desconhecido';
  }


}
