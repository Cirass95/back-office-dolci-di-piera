import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  darkMode = signal<boolean>(false);
  gridMode = signal<boolean>(true);

  toggleDarkMode() {
    const element = document.querySelector('html');
    element?.classList.toggle('my-app-dark');
    this.darkMode.set(!this.darkMode());
  }
}
