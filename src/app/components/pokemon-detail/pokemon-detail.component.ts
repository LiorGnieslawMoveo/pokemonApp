import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})
export class PokemonDetailComponent {
  @Input() pokemon?: Pokemon;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  closePopup(): void {
    this.close.emit();
  }

  preventClose(event: MouseEvent): void {
    event.stopPropagation();
  }

  getProperty(pokemon: Pokemon, property: string): string {
    switch (property) {
      case 'Height':
        return pokemon.height + ' cm';
      case 'Weight':
        return pokemon.weight + ' kg';
      default:
        return '';
    }
  }
}