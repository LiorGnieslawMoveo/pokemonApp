import { Component, OnInit } from '@angular/core';

import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.scss'
})
export class PokemonsComponent implements OnInit {

  pokemons: Pokemon[] = [];

  selectedPokemon?: Pokemon;

  constructor(private pokemonService: PokemonService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  onSelect(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
    this.messageService.add(`PokemonsComponent: Selected pokemon id=${pokemon.id}`);
  }

  getPokemons(): void {
    this.pokemonService.getPokemons()
        .subscribe(pokemons => this.pokemons = pokemons)
  }
}
