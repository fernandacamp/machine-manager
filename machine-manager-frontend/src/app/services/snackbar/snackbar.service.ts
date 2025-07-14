import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export enum SnacbarType {
    SUCCESS,
    WARNING,
    ERROR,
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

 constructor(private snackBar: MatSnackBar) { }

 /**
  * Exibe uma notificação temporária (snackbar) com uma mensagem, estilo e duração personalizados.
  * @param message Mensagem que será exibida no snackbar.
  * @param snacbarType Tipo de snackbar a ser exibido (Sucesso, Aviso ou Erro).
  * @param duration Tempo em milissegundos que o snackbar ficará visível.
  * @param panelCustomClass Lista de estilos que serão aplicados no snackbar.
  */
  showSnackbar(message: string, snacbarType: SnacbarType,duration: number = 3000, panelCustomClass: string[] = []){

    const panelClass = snacbarType == SnacbarType.SUCCESS
      ? 'app-snackbar-success'
      : snacbarType == SnacbarType.WARNING
      ? 'app-snackbar-warning'
      : 'app-snackbar-error';

    this.snackBar.open(message, 'X', {
      duration: duration,
      panelClass: [
        'custom-snackbar', 
        panelClass, 
        ...panelCustomClass 
      ]
    });
  }
}
