import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from "./auth/services/auth.service";

@Component({
  selector: 'rm-root',
  standalone: true,
  imports: [CommonModule,
    RouterModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rent-motobike';
  logged = false;

  constructor(
    public authService: AuthService,
  ) {}

  logout() {
    this.authService.doLogout()
  }
}
