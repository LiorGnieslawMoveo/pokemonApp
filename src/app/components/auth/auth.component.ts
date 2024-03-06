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

  constructor(private pokemonService: PokemonService, private router: Router){}

  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('loggedInEmail')) {
      const storedEmail = sessionStorage.getItem('loggedInEmail');
        // this.isLoggedIn = true;
    }
    this.pokemonService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

  }

  login(): void {
    if (this.email === 'demo@skills.co.il') {
      sessionStorage.setItem('loggedInEmail', this.email);
      // this.isLoggedIn = true;
      this.pokemonService.setLoggedInStatus(true);
      this.router.navigate(['/pokemons']);
    } else {
      alert('Unauthorized email address');
    }
  }
}
