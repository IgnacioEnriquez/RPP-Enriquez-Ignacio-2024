import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  user$ : any;
  isAdmin : boolean = false;
   
  constructor(private authService: AuthService, private router : Router) {}

  ngOnInit(): void {

    setTimeout(()=>
    {

      if(this.authService.user$)
      {
        this.user$ = this.authService.user$
  
        this.authService.getUserDatabase().then((user : any)=>
        {
          if(user.isAdmin)
          {
            this.isAdmin = true;
          }
  
        })
  
      }
    },3000) 


  }

  cerrarSesion() {
    this.authService.userLogout().then(()=>
    {
      this.user$ = this.authService.user$
      this.router.navigate([''])

    });
  }

}
