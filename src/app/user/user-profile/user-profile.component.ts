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
      name: '',
      email: '',
      phone: 0,
      license: '',
      role: '',
      me: false
    };

  }

  ngOnInit(): void {

    let idUser = this.route.snapshot.paramMap.get("id");
    const id = idUser ? +idUser : null;
    console.log(id);
    if(id == null){
      this.userService.getMe()
      .subscribe({
        next: rta => this.user = rta,
        error: error => console.error(error),
        complete: () => console.log("User loaded")
      });
    }
    else{
      this.userService.getOneUser(id? id: 0)
      .subscribe({
        next: rta => this.user = rta,
        error: error => console.error(error),
        complete: () => console.log("User loaded")
      });
    }
  }
  goBack() {
    this.router.navigate(['/motos']);
  }

  edit() {
    let idUser = this.route.snapshot.paramMap.get("id");
    const id = idUser ? +idUser : null;
    this.router.navigate(['/users/edit']);
  }

}
