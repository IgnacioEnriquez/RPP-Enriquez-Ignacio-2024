import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from '../../clases/producto';
import { EntidadesService } from '../../services/entidades.service';
import { CommonModule } from '@angular/common';
import { ListadoProductosComponent } from '../listado-productos/listado-productos.component';

@Component({
  selector: 'app-tabla-producto',
  standalone: true,
  imports: [CommonModule,ListadoProductosComponent],
  templateUrl: './tabla-producto.component.html',
  styleUrl: './tabla-producto.component.css'
})
export class TablaProductoComponent {
  
  @Output() PasamosUnProducto: EventEmitter<Producto> = new EventEmitter<Producto>();

  listadoProductos: Producto[] = [];

  constructor(private entidadesService: EntidadesService) {}

  ngOnInit(): void {
    this.entidadesService.traerProductos().then((productos) => {
      
        this.listadoProductos = productos;
      
    });
  }

  pasarProducto(event: any) {
    this.PasamosUnProducto.emit(event);
  }
}
