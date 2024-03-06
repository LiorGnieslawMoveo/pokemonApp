import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  email: string = '';
  isLoggedIn: boolean = false;
  errorMessage: string = '';

  constructor(private pokemonService: PokemonService, private router: Router){}

  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('isLoggedIn')) {
      const storedEmail = sessionStorage.getItem('isLoggedIn');
    }
    this.pokemonService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

  }

  login(): void {
    if (this.email === 'demo@skills.co.il') {
      sessionStorage.setItem('isLoggedIn', 'true');
      this.pokemonService.setLoggedInStatus(true);
      this.router.navigate(['/pokemons']);
    } else {
      this.errorMessage = 'Unauthorized email address';
    }
  }
}
