import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../user/interfaces/user';
import { UserService } from '../services/user.service';

import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'rm-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user!: User;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly userService: UserService

  ) {
    this.resetUser();
  }

  resetUser() {
    this.user =  {
      email: '',
      roles: [],
      password: '',
      name:'',
      phone: 0,
      license: ''
    }
    };


  ngOnInit(): void {

    this.userService.getProfile()
    .subscribe({
      next: rta => this.user = rta,
      error: error => console.error(error),
      complete: () => console.log("User loaded")
    });


  }
  goBack() {
    this.router.navigate(['/motos']);
  }

  edit() {
    this.router.navigate(['/users', this.user.id, 'edit']);
  }

}
