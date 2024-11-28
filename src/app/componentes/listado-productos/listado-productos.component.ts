import { Component } from '@angular/core';
import { Producto } from '../../clases/producto';
import { CommonModule } from '@angular/common';
import { DetallePaisComponent } from '../detalle-pais/detalle-pais.component';
import { DetalleProductoComponent } from '../detalle-producto/detalle-producto.component';
import { TablaProductoComponent } from '../tabla-producto/tabla-producto.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-productos',
  standalone: true,
  imports: [CommonModule,DetallePaisComponent,DetalleProductoComponent,TablaProductoComponent,NavbarComponent],
  templateUrl: './listado-productos.component.html',
  styleUrl: './listado-productos.component.css'
})
export class ListadoProductosComponent {

  productoActivo: Producto = new Producto(0, '', 0, 0, {});

  constructor(private authService : AuthService, private router : Router ) {}

  ngOnInit(): void {
    setTimeout(() => {
      
      if(!this.authService.user$)
      {
        this.router.navigate([''])
  
      }
    }, 2000);
  }

  productoSeleccionado($event:any){
    this.productoActivo = $event;
  }

}
