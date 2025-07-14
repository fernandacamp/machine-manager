import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { Observable } from 'rxjs';
import { Machine } from '../../core/models/machine.model';
import { Pagination } from '../../core/models/pagination.model';
import { MachineStatus } from '../../core/enums/status-machine.enum';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  private apiUrl = `${environment.apiUrl}/machines`

  constructor(private http: HttpClient) { }


  /** 
    * Busca todas as máquinas com filtros e paginação.
    * @param page Número da página atual.
    * @param pageSize Quantidade de itens por página.
    * @param status (Opcional) Filtro de status da máquina.
    * @param query (Opcional) Chave de busca para o filtro por nome ou outros campos.
    * @returns Observable com a lista de máquinas paginada.
  */
  getMachines(page: number = 1, pageSize: number = 10, status?: MachineStatus, query?: string): Observable<Pagination<Machine>> {
    let params = new HttpParams()
    .set('page', page)
    .set('pageSize', pageSize);

    if(status != undefined) params = params.set('status', status);
      
    if(query) params = params.set('query', query);

    return this.http.get<Pagination<Machine>>(this.apiUrl, {params});

  }

  /**
   * Busca uma máquina específica por ID.
   * @param id UUID da máquina a ser buscada.
   * @returns Observable com os dados da máquina.
   */

  getMachineById(id: string): Observable<Machine> {
    return this.http.get<Machine>(`${this.apiUrl}/${id}`);
  }

  /**
   * Cria uma nova máquina.
   * @param machine  Objeto contendo os dados da máquina a ser criada.
   * @returns Observable com os dados da máquina criada.
   */

  createMachine(machine: Machine): Observable<Machine> {
    return this.http.post<Machine>(this.apiUrl, machine);
  }

  /**
   * Atualiza a telemetria de uma máquina específica.
   * @param id UUID da máquina a ser atualizada.
   * @param telemetryData  Dados de telemetria a serem atualizados.
   * @returns Observable com os dados da máquina atualizados.
   */

  updateTelemetry(id: string, telemetryData: any): Observable<Machine> {
    return this.http.patch<Machine>(`${this.apiUrl}/${id}/telemetry`, telemetryData);
  }

  /**
   * Remove uma máquina pelo ID.
   * @param id UUID da máquina a ser removida.
   * @returns Observable<void> indicando a operação concluída sem retorno de corpo.
   */

  deleteMachine(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
