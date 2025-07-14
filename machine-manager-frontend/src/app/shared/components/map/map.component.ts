import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { Machine } from '../../../core/models/machine.model';
import { GeocodingService } from '../../../services/geocoding/geocoding.service';
import { GeocodingModel } from '../../../core/models/geocoding.model';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit, OnChanges {
  center = { lat: -19.9191, lng: -43.9386 };
  @Input() machines: Machine[] = [];
  
  private coordinatesCache = new Map<string, { lat: number, lng: number }>();
  machinesWithCoordinates: Array<Machine & { coordinates: { lat: number, lng: number } }> = [];

  constructor(private geocodingService: GeocodingService) { }

  ngOnInit() {
    this.processMachines();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['machines']) {
      this.processMachines();
    }
  }

  private processMachines() {
    this.machinesWithCoordinates = [];
    
    this.machines.forEach(machine => {
      if (this.coordinatesCache.has(machine.location)) {
        const coordinates = this.coordinatesCache.get(machine.location)!;
        this.machinesWithCoordinates.push({ ...machine, coordinates });
      } else {
        this.processLocation(machine);
      }
    });
  }

  private processLocation(machine: Machine) {
    if (this.isCoordinate(machine.location)) {
      const [lat, lng] = machine.location.split(',').map(Number);
      const coordinates = { lat, lng };
  
      this.coordinatesCache.set(machine.location, coordinates);
      this.machinesWithCoordinates.push({ ...machine, coordinates });
    } else {
      const tempCoordinates = { lat: 0, lng: 0 };
      this.machinesWithCoordinates.push({ ...machine, coordinates: tempCoordinates });
 
       this.geocodingService.getCoordinates(machine.location).subscribe({
        next: (response: GeocodingModel) => {
          if (response.status === 'OK' && response.results.length > 0) {
            const location = response.results[0].geometry.location;
            const coordinates = { lat: location.lat, lng: location.lng };
            
            this.coordinatesCache.set(machine.location, coordinates);
            
            const machineIndex = this.machinesWithCoordinates.findIndex(m => m.id === machine.id);
            if (machineIndex !== -1) {
              this.machinesWithCoordinates[machineIndex].coordinates = coordinates;
            }
          } else {
            console.error('Geocoding failed:', response.status);
          }
        },
        error: (error) => {
          console.error('Error in geocoding:', error);
        }
      
      });
    }
  }

  private isCoordinate(input: string): boolean {
    const regex = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;
    return regex.test(input.trim());
  }
}