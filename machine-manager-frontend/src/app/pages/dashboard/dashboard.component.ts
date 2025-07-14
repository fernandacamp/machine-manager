import { Component, OnInit } from '@angular/core';
import { MachineTableComponent } from "../../shared/components/machine-table/machine-table.component";
import { Machine } from '../../core/models/machine.model';
import { MachineService } from '../../services/machines/machine.service';
import { PageEvent } from '@angular/material/paginator';
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { SnacbarType, SnackbarService } from '../../services/snackbar/snackbar.service';
import { MachineStatus } from '../../core/enums/status-machine.enum';
import { FormsModule } from '@angular/forms';
import { MapComponent } from "../../shared/components/map/map.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MachineTableComponent,
    MatFormField,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule, MapComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  machines: Machine[] = [];

  statusOptions = new Map<MachineStatus, string>([
    [MachineStatus.OPERATING, 'Operando'],
    [MachineStatus.MAINTENANCE, 'Parada para manuntenção'],
    [MachineStatus.OFF, 'Desligada']
  ]);

  constructor(private machineService: MachineService, private snackbarService: SnackbarService, private title: Title) { }

  page: number = 1;
  pageSize: number = 10;
  total: number = 0;
  statusSelect?: MachineStatus;
  searchTerm: string = ''; 

  ngOnInit() {
    this.title.setTitle('Dashboard')
    this.statusSelect = undefined;
    this.getMachines();
  }

  getMachines() {
    this.machineService.getMachines(this.page, this.pageSize, this.statusSelect, this.searchTerm).subscribe({
      next: (response) => {
        this.machines = response.data;
        this.total = response.total;
      },
      error: (error) => {
        this.snackbarService.showSnackbar('Erro ao buscar maquinas. ' + error.statusText, SnacbarType.ERROR);
      }
    });
  }

   setPage(event: PageEvent){
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getMachines();
  }

  setStatus(event: MatSelectChange){
    this.statusSelect = event.value;
    this.getMachines();
  }

  onSearch(){
    this.getMachines();
  }

   deleteMachine(machineId: string) {
    this.machineService.deleteMachine(machineId).subscribe({
      next: (_) => {
        this.snackbarService.showSnackbar('Máquina removida com sucesso! ', SnacbarType.SUCCESS);
        this.getMachines();
      },
      error: (error) => {
        this.snackbarService.showSnackbar('Erro ao buscar maquinas. ' + error.statusText, SnacbarType.ERROR);
      }
    });
  }

}
