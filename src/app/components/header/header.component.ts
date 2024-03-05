import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {
      this.isLoggedIn = sessionStorage.getItem('loggedInEmail') === 'true';
    }
  }

  logout(): void {
    sessionStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['/auth']).then(() => {
      window.location.reload();
    })
  }
}
