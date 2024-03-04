import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { Pokemon } from '../pokemon';
import { POKEMONS } from '../mock-pokemons';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.scss'
})
export class PokemonsComponent {
  pokemons = POKEMONS;

  selectedPokemon?: Pokemon;

  onSelect(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
  }

}
