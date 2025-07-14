import { Component, OnInit } from '@angular/core';
import { MachineStatusComponent } from "../../shared/components/machine-status/machine-status.component";
import { Machine } from '../../core/models/machine.model';
import { SnacbarType, SnackbarService } from '../../services/snackbar/snackbar.service';
import { MachineService } from '../../services/machines/machine.service';
import { ActivatedRoute } from '@angular/router';
import { MachineStatus } from '../../core/enums/status-machine.enum';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-machine-details',
  standalone: true,
  imports: [MachineStatusComponent,
    MatCardModule,
    MatListModule,
  ],
  templateUrl: './machine-details.component.html',
  styleUrl: './machine-details.component.css'
})
export class MachineDetailsComponent implements OnInit {

  machineId?: string;
  machine?: Machine;

  constructor(private route: ActivatedRoute, private machineService: MachineService, private snackbarService: SnackbarService) {}

  ngOnInit() {
    this.machineId = this.route.snapshot.params['id'];
    this.loadMachineDetails();
  }

  loadMachineDetails() {
    this.machineService.getMachineById(this.machineId!).subscribe({
      next: (response) => {
        this.machine = response;
      },
      error: (error) => {
        this.snackbarService.showSnackbar('Erro ao buscar maquina. ' + error.statusText, SnacbarType.ERROR);
      }
    });
  }
}
