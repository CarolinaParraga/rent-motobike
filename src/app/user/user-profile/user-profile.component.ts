import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../interfaces/user'
import { UserService } from '../services/user.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'rm-user-profile',
  standalone: true,
  imports: [
    CommonModule, RouterLink, RouterLinkActive, RouterOutlet
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user!: User;
  userAdmin! : string [];
  bool = false;


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
      password: '',
      roles: [],
      name:'',
      phone: 0,
      license: ''
    }
    };


  ngOnInit(): void {
    this.resetUser()
    this.userService.getProfile()
    .subscribe({
      next: rta => {
        this.user = rta
        console.log(this.user)
        this.userAdmin = this.user.roles!
        this.bool = this.userAdmin.includes('ROLE_ADMIN')
        console.log(this.bool)
      },
      error: error => console.error(error),
      complete: () => console.log("User loaded")

    });

  }
  role(){
    this.userAdmin = this.user.roles!
    this.bool = this.userAdmin.includes('ROLE_ADMIN')

  }

  goBack() {
    this.router.navigate(['/motos']);
  }

  edit() {
    this.router.navigate(['/users/edit']);
  }

}
