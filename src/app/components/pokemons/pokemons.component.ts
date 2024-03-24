import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.scss'
})
export class PokemonsComponent implements OnInit {
  isLoggedIn: boolean = false;

  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  searchInput: string = '';
  allTypes: string[] = [];
  searchHistory: string[] = [];
  selectedType: string = '';

  selectedPokemon?: Pokemon;

  @ViewChild('popup') popup: TemplateRef<any>;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private cookieService: CookieService,
    private historyService: HistoryService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.cookieService.get('isLoggedIn') === 'true';
    this.pokemonService.getIsLoggedInSubjectStatus().subscribe(isUserLoggedIn => {
      this.isLoggedIn = isUserLoggedIn;
      if (this.isLoggedIn === false) {
        this.router.navigate(['/login']);
      }
    });
    this.getPokemons();
    this.searchHistory = this.historyService.loadSearchHistory();
  }

  openPopup(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
    this.searchHistory.push(this.selectedPokemon.name);
    if (this.searchHistory.length > 5) {
      this.searchHistory.shift();
    }
    localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
  }

  closePopup(): void {
    this.selectedPokemon = undefined;
  }

  getPokemons(): void {
    this.pokemonService.getPokemons()
      .subscribe((pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
        this.filteredPokemons = [...pokemons];
        this.getAllTypes();
      });
  }

  searchByName(event: string): void {
    this.filteredPokemons = this.pokemons.filter((pokemon: Pokemon) =>
      pokemon.name.toLowerCase().includes(this.searchInput.toLowerCase()) &&
      (this.selectedType === 'all' || pokemon.types.includes(this.selectedType))
    );
  }

  getAllTypes(): void {
    const allTypesSet = new Set<string>();
    this.pokemons.forEach((pokemon: Pokemon) => {
      pokemon.types.forEach(type => allTypesSet.add(type));
    });
    this.allTypes = Array.from(allTypesSet);
  }

  filterByType(type: string): void {
    if (type === 'all') {
      this.filteredPokemons = [...this.pokemons];
      this.selectedType = type;
    } else {
      this.filteredPokemons = this.pokemons.filter((pokemon: Pokemon) =>
        pokemon.types.includes(type)
      );
      this.selectedType = type;
    }
  }
}
