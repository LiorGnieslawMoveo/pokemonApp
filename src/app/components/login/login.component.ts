import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
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
    this.pokemonService.getIsLoggedInSubject().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

  }

  login(): void {
    if (this.email === 'demo@skills.co.il') {
      this.cookieService.set('isLoggedIn', 'true');
      // this.isLoggedIn = true;
      this.pokemonService.setLoggedInStatus(true);
      this.router.navigate(['/pokemons']);
      console.log('logged in to pokemons')
    } else {
      this.errorMessage = 'Unauthorized email address';
    }
  }
}
