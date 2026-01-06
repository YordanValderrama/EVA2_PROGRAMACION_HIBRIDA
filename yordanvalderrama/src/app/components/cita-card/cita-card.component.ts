import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cita-card',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-item>
      <ion-label>
        <h2>{{ frase }}</h2>
        <p>{{ autor }}</p>
      </ion-label>

      <ion-button
        *ngIf="mostrarEliminar"
        color="danger"
        fill="clear"
        slot="end"
        (click)="onEliminar()">
        Eliminar
      </ion-button>
    </ion-item>
  `,
  styles: [`
    ion-item { margin-bottom: 10px; }
    h2 { font-weight: bold; }
  `]
})
export class CitaCardComponent {
  @Input() frase: string = '';
  @Input() autor: string = '';
  @Input() mostrarEliminar: boolean = false;

  @Output() eliminar = new EventEmitter<void>();

  onEliminar() {
    this.eliminar.emit();
  }
}


