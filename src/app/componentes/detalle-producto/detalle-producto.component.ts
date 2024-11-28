import { Component, Input } from '@angular/core';
import { Producto } from '../../clases/producto';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [NavbarComponent,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent {

  @Input() productoRecibido?: Producto;

  constructor() { }

  ngOnInit(): void {
    console.log(this.productoRecibido);
  }

}
