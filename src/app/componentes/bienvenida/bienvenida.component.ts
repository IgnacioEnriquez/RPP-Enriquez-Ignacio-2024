import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css'
})
export class BienvenidaComponent {
 

  miPerfil: any = null;
  user : any; 

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.http
      .get('https://api.github.com/users/IgnacioEnriquez')
      .subscribe((res: any) => {
        console.log(res);
        this.miPerfil = res;
        console.log(res);
      });
      
      const auth = getAuth();
  
    onAuthStateChanged(auth, async (user : any) => {      
      if (user) {  
        this.authService.getUserDatabase().then((user)=>
        {   
          this.user = user;  
       
        }).catch((error)=>
        {
          console.log(error);
        });  
      } else {
        this.user = null;   
        // ...
      }
    });
       
  }
}
