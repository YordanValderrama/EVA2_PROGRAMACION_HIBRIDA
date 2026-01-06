// src/app/services/config.service.ts
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'  // Angular proveerá la instancia automáticamente
})
export class ConfigService {

  async setBorrarCitasInicio(valor: boolean) {
    await Preferences.set({ key: 'borrarCitasInicio', value: valor ? 'true' : 'false' });
  }

  async getBorrarCitasInicio(): Promise<boolean> {
    const res = await Preferences.get({ key: 'borrarCitasInicio' });
    return res.value === 'true';
  }
}



