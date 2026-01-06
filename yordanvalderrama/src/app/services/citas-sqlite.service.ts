import { Capacitor } from '@capacitor/core';
import { SQLiteConnection, CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CitasSQLiteService {
  private sqlite!: SQLiteConnection;
  private db!: SQLiteDBConnection;

  async init() {
    if (this.db) return;

    this.sqlite = new SQLiteConnection(CapacitorSQLite);

    if (Capacitor.getPlatform() === 'web') {
      await customElements.whenDefined('jeep-sqlite');
      const el = document.querySelector('jeep-sqlite');
      if (!el) { console.error('<jeep-sqlite> no está en el DOM');
      return;
    }
    await this.sqlite.initWebStore();
  }

  this.db = await this.sqlite.createConnection('citasDB', false, 'no-encryption', 1, false);
  this.db = await this.sqlite.retrieveConnection('citasDB', false);
  await this.db.open();

  await this.db.execute(`
    CREATE TABLE IF NOT EXISTS citas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      frase TEXT NOT NULL,
      autor TEXT NOT NULL
    );
  `);
}

  async obtenerCitas() {
    await this.init();
    const res = await this.db.query('SELECT * FROM citas');
    let citas = res.values ?? [];

    if (citas.length === 0) {
      console.log('No hay citas, insertando predefinidas...');
      await this.agregarCita({ frase: 'La vida es bella', autor: 'Anónimo' });
      await this.agregarCita({ frase: 'El conocimiento es poder', autor: 'Francis Bacon' });
      await this.agregarCita({ frase: 'La imaginación es más importante que el conocimiento', autor: 'Albert Einstein' });

      const res2 = await this.db.query('SELECT * FROM citas');
      citas = res2.values ?? [];
    }

    console.log('Citas obtenidas:', citas);
    return citas;
  }

  async agregarCita(cita: { frase: string; autor: string }) {
    await this.init();
    await this.db.run(
      'INSERT INTO citas (frase, autor) VALUES (?, ?)',
      [cita.frase, cita.autor]
    );
    console.log('Cita agregada:', cita);

    const check = await this.db.query('SELECT * FROM citas');
    console.log('Citas después de insertar:', check.values);
  }

  async eliminarCita(id: number) {
    await this.init();
    await this.db.run('DELETE FROM citas WHERE id = ?', [id]);
    console.log('Cita eliminada con id:', id);
  }
}