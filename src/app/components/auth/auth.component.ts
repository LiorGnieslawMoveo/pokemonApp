import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  email: string = '';
  isLoggedIn: boolean = false;
  errorMessage: string = '';

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private cookieService: CookieService
    ){}

  ngOnInit(): void {
    this.isLoggedIn = this.cookieService.get('isLoggedIn') === 'true';
    this.pokemonService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

  }

  login(): void {
    if (this.email === 'demo@skills.co.il') {
      this.cookieService.set('isLoggedIn', 'true');
      // this.isLoggedIn = true;
      this.pokemonService.setLoggedInStatus(true);
      this.router.navigate(['/pokemons']);
    } else {
      this.errorMessage = 'Unauthorized email address';
    }
  }
}
