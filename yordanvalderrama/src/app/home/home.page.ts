import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CitasSQLiteService } from '../services/citas-sqlite.service';
import { IonHeader, IonButton, IonContent, IonToolbar, IonTitle } from "@ionic/angular/standalone";
import { CitaCardComponent } from '../components/cita-card/cita-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonContent,
    CitaCardComponent
  ]
})
export class HomePage implements OnInit {
  citaActual: any = null;
  permitirBorrar = false;

  constructor(
    private citasService: CitasSQLiteService,
    private router: Router 
  ) {}

  async ngOnInit() {
    await this.citasService.init();
    await this.mostrarCitaAleatoria();
  }

  async ionViewWillEnter() {
    await this.mostrarCitaAleatoria();
  }

  async mostrarCitaAleatoria() {
    const citas = await this.citasService.obtenerCitas();
    if (citas.length > 0) {
      const index = Math.floor(Math.random() * citas.length);
      this.citaActual = citas[index];
      console.log('Cita actual:', this.citaActual);
    } else {
      this.citaActual = null;
    }
  }

  irAGestionCitas() {
    this.router.navigateByUrl('/gestion-citas'); 
  }

  irAConfiguracion() {
    this.router.navigateByUrl('/configuracion'); 
  }
}