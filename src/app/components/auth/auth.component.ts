import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  email: string = '';
  isLoggedIn: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {
      const storedEmail = sessionStorage.getItem('loggedInEmail');
      if (storedEmail === 'demo@skills.co.il') {
        this.isLoggedIn = true;
      }
    }
  }

  login(): void {
    if (this.email === 'demo@skills.co.il') {
      sessionStorage.setItem('loggedInEmail', this.email);
      this.isLoggedIn = true;
    } else {
      alert('Unauthorized email address');
    }
  }
}
