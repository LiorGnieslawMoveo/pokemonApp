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
  validEmail: string = 'demo@skills.co.il';

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private cookieService: CookieService
    ){}

  ngOnInit(): void {
    this.isLoggedIn = this.cookieService.get('isLoggedIn') === 'true';
    this.pokemonService.getIsLoggedInSubjectStatus().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    if (this.isLoggedIn){
      this.router.navigate(['/pokemons']);
    }
  }

  login(): void {
    if (this.email === this.validEmail) {
      this.cookieService.set('isLoggedIn', 'true');
      this.isLoggedIn = true;
      this.pokemonService.setLoggedInStatus(true);
      this.router.navigate(['/pokemons']);
    } else {
      this.errorMessage = 'Unauthorized email address';
    }
  }
}
