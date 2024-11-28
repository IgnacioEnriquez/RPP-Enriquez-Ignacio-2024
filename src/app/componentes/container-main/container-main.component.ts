import { Component } from '@angular/core';
import { Container } from '../../clases/container';
import { CommonModule } from '@angular/common';
import { AltaContainerComponent } from '../alta-container/alta-container.component';
import { BajaContainerComponent } from '../baja-container/baja-container.component';
import { TablaContainerComponent } from '../tabla-container/tabla-container.component';
import { ModificacionContainerComponent } from '../modificacion-container/modificacion-container.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-container-main',
  standalone: true,
  imports: [CommonModule,AltaContainerComponent,BajaContainerComponent,TablaContainerComponent,ModificacionContainerComponent,NavbarComponent],
  templateUrl: './container-main.component.html',
  styleUrl: './container-main.component.css'
})
export class ContainerMainComponent {
  
  containerRecibido: any =  {
    codigo : 0,  
    empresa : '',
    cantidad : 100};


    constructor(private authService : AuthService, private router : Router ) {}

    ngOnInit(): void {
      setTimeout(() => {
        
        if(!this.authService.user$ || !this.authService.user$.__zone_symbol__value.isAdmin )
        {
          this.router.navigate([''])
    
        }        
      }, 2000);
    }

  tomarContainerEnviado(event: any) {
   
    
  }

  tomarContainerActivo(event: any) {
    console.log(event);
    this.containerRecibido = event;
  }

}
