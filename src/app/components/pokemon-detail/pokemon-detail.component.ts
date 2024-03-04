import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '../../pokemon';

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
}