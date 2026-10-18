import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-head-bar',
  // represente le nom de la balise correspendante à ce composant
  styleUrl: './head-bar.css',
  templateUrl: './head-bar.html',
})
export class HeadBar implements OnInit {
  faMoon = faMoon;
  faSun = faSun;
  isDark = false;

  // Au chargement : on relit le choix sauvegardé (clair ou sombre)
  ngOnInit() {
    this.isDark = localStorage.getItem('theme') === 'dark';
    this.applyTheme();
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    this.applyTheme();
  }

  // Ajoute ou enlève la classe "dark" sur <body> (les couleurs sont dans styles.css)
  applyTheme() {
    document.body.classList.toggle('dark', this.isDark);
  }
}
