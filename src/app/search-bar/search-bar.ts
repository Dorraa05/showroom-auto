import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Auto } from '../interfaces/auto';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-search-bar',
  styleUrl: './search-bar.css',
  templateUrl: './search-bar.html',
})
export class SearchBar implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  faHeart = faHeart;
  @Input() autos: Auto[] = [];
  @Output() onSelectCar= new EventEmitter<Auto>();
  selectedAutos: Auto[] = [];

  // Nouvelles variables : on retient ce que l'utilisateur a choisi
  searchText = '';
  sortBy = 'default';
  showFavoritesOnly = false;
  favorites: number[] = []; // liste des id des voitures favorites

  // Au démarrage : on charge les favoris sauvegardés et on affiche toutes les voitures
  ngOnInit() {
    this.loadFavorites();
    this.updateList();
  }

  selectAutos(selectedBrand: string) {
    this.searchText = selectedBrand;
    this.updateList();
  }

  changeSort(value: string) {
    this.sortBy = value;
    this.updateList();
  }

  toggleFavoritesOnly(checked: boolean) {
    this.showFavoritesOnly = checked;
    this.updateList();
  }

  // Calcule la liste à afficher : recherche -> favoris -> tri
  updateList() {
    let list: Auto[];
    if (this.searchText) {
      list = this.autos.filter(x => x.brand.toLowerCase().startsWith(this.searchText.toLowerCase()));
    }
    else {
      list = [...this.autos]; // copie, pour ne pas modifier la liste d'origine en la triant
    }

    if (this.showFavoritesOnly) {
      list = list.filter(x => this.isFavorite(x.id));
    }

    if (this.sortBy === 'priceAsc') {
      list.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'priceDesc') {
      list.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'power') {
      list.sort((a, b) => b.power - a.power);
    } else if (this.sortBy === 'name') {
      list.sort((a, b) => (a.brand + a.model).localeCompare(b.brand + b.model));
    }

    this.selectedAutos = list;
  }

  isFavorite(id: number): boolean {
    return this.favorites.includes(id);
  }

  toggleFavorite(auto: Auto) {
    if (this.isFavorite(auto.id)) {
      this.favorites = this.favorites.filter(id => id !== auto.id);
    } else {
      this.favorites = [...this.favorites, auto.id];
    }
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    if (this.showFavoritesOnly) {
      this.updateList(); // si on est en mode "favoris", la carte doit disparaître
    }
  }

  loadFavorites() {
    try {
      this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch {
      this.favorites = [];
    }
  }

  selectCar(auto: Auto) {
    this.onSelectCar.emit(auto);
  }

}
