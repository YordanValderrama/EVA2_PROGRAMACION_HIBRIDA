import { Component } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonToggle, IonButton, IonButtons } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; 

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonToggle,
    CommonModule,
    FormsModule,
    IonButton,
    RouterModule
  ]
})
export class ConfiguracionPage {
  borrarCitasInicio = false;

  constructor(private configService: ConfigService, private router: Router) {} 

  async ngOnInit() {
    this.borrarCitasInicio = await this.configService.getBorrarCitasInicio();
  }

  async guardarConfiguracion() {
    await this.configService.setBorrarCitasInicio(this.borrarCitasInicio);
    alert('Configuración guardada');
  }

  volverAlMenu() {
    this.router.navigateByUrl('/'); 
  }
}


