import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    // if (typeof sessionStorage !== 'undefined') {
    //   this.isLoggedIn = sessionStorage.getItem('loggedInEmail') ? true : false ;
    // }
    this.pokemonService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout(): void {
    sessionStorage.removeItem('isLoggedIn');
    this.pokemonService.setLoggedInStatus(false);
    this.router.navigate(['/auth']);
  }
}
