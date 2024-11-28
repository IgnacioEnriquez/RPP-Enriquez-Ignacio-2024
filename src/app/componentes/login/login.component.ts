import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { User } from '../../clases/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user: any = new User();
  userForm: any = new User();
  spinner: boolean = false;

  confirmPassword = '';

  ngOnInit(): void {
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


  constructor(
    private authService: AuthService,
  //  private notifyService: NotificationService,
    private router: Router
  ) {}


  async login(event: Event) {
    this.spinner = true;
    event.preventDefault();
    if (
      this.userForm.email === '' ||
      this.userForm.password === '' ||
      this.confirmPassword === ''
    ) {
      this.spinner = false;
    } else if (this.userForm.password !== this.confirmPassword) {

      this.spinner = false;
    } else {
      const inicio = await this.authService.userLogin(
        this.userForm.email,
        this.userForm.password
      );
      if (inicio) {
        if(this.authService.getUserLogged())
        {
          this.authService.getUserDatabase().then((user)=>
            {     
              this.user = user;          
            }).catch((error)=>
            {
              console.log(error);
            });  
        
        }                      
        setTimeout(() => {
          this.spinner = false;
          this.router.navigate(['']);
        }, 2000);
      }
      else  
      {
        this.spinner = false;

      }
    }
  } // end of login

  loadFields(option: number) {
    switch (option) {
      case 1:
        this.confirmPassword = '111111';
        this.userForm.email = 'empleado@gmail.com';
        this.userForm.password = '111111';
        //this.notifyService.showInfo('Campos cargados', 'Empleado');
        break;
      case 2:
        this.confirmPassword = 'soyadmin1234';
        this.userForm.email = 'admin@mail.com';
        this.userForm.password = 'soyadmin1234';
        //this.notifyService.showInfo('Campos cargados', 'Administrador');
        break;
      default:
        break;
    }
  } // end of loadFields

}
