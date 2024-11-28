import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormAltaProductoComponent } from '../form-alta-producto/form-alta-producto.component';
import { ListadoPaisesComponent } from '../listado-paises/listado-paises.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-producto',
  standalone: true,
  imports: [NavbarComponent,FormAltaProductoComponent,ListadoPaisesComponent],
  templateUrl: './alta-producto.component.html',
  styleUrl: './alta-producto.component.css'
})
export class AltaProductoComponent {

  paisSeleccionado:any;
  
  constructor(private authService :AuthService, private router : Router) { }

  ngOnInit(): void {

   setTimeout(() => {
      
      if(!this.authService.user$)
      {
        this.router.navigate([''])
  
      }
    }, 2000);
    
  }

  tomarPaisSeleccionado(event: any) {
    this.paisSeleccionado = event;
  }

}
