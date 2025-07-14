import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { GeocodingModel } from '../../core/models/geocoding.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  private apiUrl = environment.geocodingUrl;
  private apiKey: string = "AIzaSyBEycNo9aN1W80vWbmhQ-RFdT16mK6t3Gw";

  constructor(private http: HttpClient) { }

  /**
   * Obtém as coordenadas geográficas (latitude e longitude) a partir da localização dada pelo usuário.
   * @param address A localização que será convertida em coordenadas geográficas.
   * @returns Observable contendo o resultado da geocodificação no formato GeocodingModel.
   */
  getCoordinates(address: string): Observable<GeocodingModel> {
    const encodedAddress = encodeURIComponent(address);
    
    let params = new HttpParams()
      .set('address', encodedAddress)
      .set('key', this.apiKey);

    return this.http.get<GeocodingModel>(this.apiUrl, {params});
  }
}
