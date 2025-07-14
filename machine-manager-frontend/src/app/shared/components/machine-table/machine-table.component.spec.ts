import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineTableComponent } from './machine-table.component';

describe('MachineTableComponent', () => {
  let component: MachineTableComponent;
  let fixture: ComponentFixture<MachineTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MachineTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MachineTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
