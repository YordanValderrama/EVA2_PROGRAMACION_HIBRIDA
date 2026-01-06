import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitasSQLiteService } from '../services/citas-sqlite.service';
import { CitaCardComponent } from '../components/cita-card/cita-card.component';
import { Cita } from '../models/cita.model';
import { RouterModule, Router } from '@angular/router'; 

@Component({
  selector: 'app-gestion-citas',
  standalone: true,
  templateUrl: './gestion-citas.page.html',
  styleUrls: ['./gestion-citas.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, CitaCardComponent, RouterModule],
})
export class GestionCitasPage {
  citas: Cita[] = [];
  nuevaFrase = '';
  nuevoAutor = '';
  errores = { frase: '', autor: '' };

  constructor(private citasService: CitasSQLiteService, private router: Router) {} 

  async ionViewWillEnter() {
    await this.cargarCitas();
  }

  async cargarCitas() {
    this.citas = await this.citasService.obtenerCitas();
    console.log('Citas cargadas:', this.citas);
  }

  validarCampos(): boolean {
    this.errores = { frase: '', autor: '' };
    let valido = true;

    if (!this.nuevaFrase.trim()) {
      this.errores.frase = 'La frase es obligatoria.';
      valido = false;
    } else if (this.nuevaFrase.trim().length < 5) {
      this.errores.frase = 'La frase debe tener al menos 5 caracteres.';
      valido = false;
    }

    if (!this.nuevoAutor.trim()) {
      this.errores.autor = 'El autor es obligatorio.';
      valido = false;
    } else if (this.nuevoAutor.trim().length < 2) {
      this.errores.autor = 'El autor debe tener al menos 2 caracteres.';
      valido = false;
    }

    return valido;
  }

  async agregarCita() {
    if (!this.validarCampos()) return;

    await this.citasService.agregarCita({
      frase: this.nuevaFrase.trim(),
      autor: this.nuevoAutor.trim(),
    });

    this.nuevaFrase = '';
    this.nuevoAutor = '';
    await this.cargarCitas();
  }

  async eliminarCita(id: number) {
    await this.citasService.eliminarCita(id);
    await this.cargarCitas();
  }

  volverAlMenu() {
    this.router.navigateByUrl('/');
  }
}