import { Component, OnInit, ViewChild, TemplateRef} from '@angular/core';

import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../type/pokemon';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.scss'
})
export class PokemonsComponent implements OnInit {

  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  searchInput: string = '';
  allTypes: string[] = []; 

  selectedPokemon?: Pokemon;

  @ViewChild('popup') popup: TemplateRef<any>;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  openPopup(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
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
}
