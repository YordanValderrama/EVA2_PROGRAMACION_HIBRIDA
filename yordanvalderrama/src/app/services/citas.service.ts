import { Preferences } from '@capacitor/preferences';

export class PreferenciasService {

  async guardarPermitirBorrar(valor: boolean) {
    await Preferences.set({
      key: 'permitir_borrar',
      value: JSON.stringify(valor)
    });
  }

  async obtenerPermitirBorrar(): Promise<boolean> {
    const res = await Preferences.get({ key: 'permitir_borrar' });
    return res.value ? JSON.parse(res.value) : false;
  }
}


