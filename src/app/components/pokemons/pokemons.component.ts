import { Component, OnInit, ViewChild } from '@angular/core';

import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../pokemon';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.scss'
})
export class PokemonsComponent implements OnInit {

  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  searchTerm: string = '';
  allTypes: string[] = []; 

  selectedPokemon?: Pokemon;

  @ViewChild('popup') popup: any;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  openPopup(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
    this.popup.openPopup(); 
  }
  
  closePopup(): void {
    this.selectedPokemon = undefined;
  }

  getPokemons(): void {
    this.pokemonService.getPokemons()
        .subscribe(pokemons => {
          this.pokemons = pokemons;
          this.filteredPokemons = [...pokemons];
          this.getAllTypes();
        });
  }
  searchByName(): void {
    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getAllTypes(): void {
    const allTypesSet = new Set<string>();
    this.pokemons.forEach(pokemon => {
      pokemon.types.forEach(type => allTypesSet.add(type));
    });
    this.allTypes = Array.from(allTypesSet);
  }

  filterByType(type: string): void {
    if (type === 'all') {
      this.filteredPokemons = [...this.pokemons];
    } else {
      this.filteredPokemons = this.pokemons.filter(pokemon =>
        pokemon.types.includes(type)
      );
    }
  }
}
