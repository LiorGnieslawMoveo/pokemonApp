import { Component, OnInit, ViewChild, TemplateRef} from '@angular/core';

import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

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

  selectedPokemon?: Pokemon;

  @ViewChild('popup') popup: TemplateRef<any>;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private cookieService: CookieService
    ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.cookieService.get('isLoggedIn') === 'true';
    console.log("getting the val from the cookie " + this.isLoggedIn)
    this.pokemonService.getIsLoggedInSubjectStatus().subscribe(isUserLoggedIn => {
      console.log("subscribing " + isUserLoggedIn)
      this.isLoggedIn = isUserLoggedIn;
      if (this.isLoggedIn === false){
        console.log("navigated")
        this.router.navigate(['/login']);
      }
    });
    this.getPokemons();
    this.loadSearchHistory();
  }

  openPopup(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
    this.searchHistory.push(this.selectedPokemon.name);
      if (this.searchHistory.length > 5){
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
      pokemon.name.toLowerCase().includes(this.searchInput.toLowerCase())
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
    } else {
      this.filteredPokemons = this.pokemons.filter((pokemon: Pokemon) =>
        pokemon.types.includes(type)
      );
    }
  }

  loadSearchHistory(): void {
    if (typeof localStorage !== 'undefined') {
      const savedSearchHistory = localStorage.getItem('searchHistory');
      if (savedSearchHistory) {
        this.searchHistory = JSON.parse(savedSearchHistory);
      }
    }
  }
}
