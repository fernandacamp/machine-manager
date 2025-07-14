import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from "@angular/material/select";
import { Machine } from '../../core/models/machine.model';
import { MachineService } from '../../services/machines/machine.service';
import { FormsModule, NgForm } from '@angular/forms';
import { MachineStatus } from '../../core/enums/status-machine.enum';
import { MatInputModule } from '@angular/material/input';
import { SnacbarType, SnackbarService } from '../../services/snackbar/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Telemetry } from '../../core/models/telemetry.model';
import { GeocodingService } from '../../services/geocoding/geocoding.service';
import { GeocodingModel } from '../../core/models/geocoding.model';

@Component({
  selector: 'app-machine-create',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, MatInputModule],
  templateUrl: './machine-create.component.html',
  styleUrl: './machine-create.component.css'
})
export class MachineCreateComponent implements OnInit {

  editMode: boolean = false;

  machine: Machine = { name: '', location: '', status: MachineStatus.OFF };

  machineId: string | undefined;

  statusOptions = new Map<MachineStatus, string>([
    [MachineStatus.OPERATING, 'Operando'],
    [MachineStatus.MAINTENANCE, 'Parada para manuntenção'],
    [MachineStatus.OFF, 'Desligada']
  ]);

  constructor(
    private machineService: MachineService, 
    private snackbarService: SnackbarService, 
    private router: Router, 
    private route: ActivatedRoute,
    private geocodingService: GeocodingService
  ) { }

  ngOnInit() {
    this.machineId = this.route.snapshot.params['id'];

    if (this.machineId) {
      this.editMode = true;
      this.loadMachineDetails();
    }
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

  save(form: NgForm) {
    if (form.invalid) return;

    this.validateLocationAndSave(form);
  }

  validateLocationAndSave(form: NgForm) {
    this.geocodingService.getCoordinates(this.machine.location).subscribe({
      next: (response: GeocodingModel) => {
        if (response.status === 'OK' && response.results.length > 0) {
          this.onSave(form);
        } else {
          this.snackbarService.showSnackbar('Localização não encontrada.', SnacbarType.ERROR);
        }
      },
      error: (_) => {
        this.snackbarService.showSnackbar(
          'Erro ao validar localização. Tente novamente.',
          SnacbarType.ERROR
        );
      }
    });
  }

  onSave(form: NgForm) {
    if (this.editMode) {
      const telemetry: Telemetry = { status: this.machine.status, location: this.machine.location }

      this.machineService.updateTelemetry(this.machineId!, telemetry).subscribe({
        next: (_) => {
          form.resetForm();
          this.snackbarService.showSnackbar('Máquina editada com sucesso', SnacbarType.SUCCESS);
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.snackbarService.showSnackbar('Erro ao editar a maquina. ' + error, SnacbarType.ERROR);
        }
      })
    } else {
      this.machineService.createMachine(this.machine).subscribe({
        next: (_) => {
          form.resetForm();
          this.snackbarService.showSnackbar('Máquina criada com sucesso', SnacbarType.SUCCESS);
        },
        error: (error) => {
          this.snackbarService.showSnackbar('Erro ao criar a maquina. ' + error, SnacbarType.ERROR);
        }
      })
    }
  }

}
