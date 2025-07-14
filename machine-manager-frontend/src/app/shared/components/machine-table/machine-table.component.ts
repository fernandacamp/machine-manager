import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MachineStatusComponent } from "../machine-status/machine-status.component";
import { Machine } from '../../../core/models/machine.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-machine-table',
  standalone: true,
  imports: [MachineStatusComponent,
    MatTableModule,
    CommonModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule, 
    MatTooltipModule
  ],
  templateUrl: './machine-table.component.html',
  styleUrl: './machine-table.component.css'
})
export class MachineTableComponent implements AfterViewInit, OnChanges {

  @Output() pageChanged = new EventEmitter<PageEvent>();
  @Output() deleteMachine = new EventEmitter<string>();

  @Input() set machines(value: Machine[]) {
    this.dataSource.data = value;
  }

  @Input() page: number = 1;
  @Input() pageSize: number = 10;
  @Input() total: number = 0;


  constructor(private router: Router) { }

  displayColumns: string[] = ['name', 'location', 'status', 'actions'];
  dataSource = new MatTableDataSource<Machine>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges() {
    setTimeout(() => {
      this.paginator.length = this.total;
      this.paginator.pageIndex = this.page - 1;
    });
  }

  onPageChange(event: PageEvent) {
    this.pageChanged.emit(event);
  }

  goToDetails(machine: any) {
    this.router.navigate(['/machines', machine.id, 'details']);
  }

  goToEdit(machine: any) {
    this.router.navigate(['/machines', machine.id, 'edit']);
  }

  confirmDelete(machine: any) {
    const confirmed = window.confirm(`Tem certeza que deseja remover a máquina "${machine.name}"?`);

    if (confirmed) {
      this.deleteMachine.emit(machine.id);
    }
  }

}
