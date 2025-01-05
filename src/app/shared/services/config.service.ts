import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  darkMode = signal<boolean>(false);
  gridMode = signal<boolean>(true);
  isMobile = signal<boolean>(false);


  constructor() {
    this.checkViewport(); 
    window.addEventListener('resize', () => this.checkViewport());
  }

  private checkViewport() {
    const isMobileView = window.innerWidth <= 768; 
    this.isMobile.set(isMobileView); 
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    element?.classList.toggle('my-app-dark');
    this.darkMode.set(!this.darkMode());
  }



}
