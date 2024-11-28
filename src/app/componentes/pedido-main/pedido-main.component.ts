import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { TablaContainerComponent } from '../tabla-container/tabla-container.component';
import { AltaPedidoComponent } from '../alta-pedido/alta-pedido.component';
import { CommonModule } from '@angular/common';
import { DetallePedidoComponent } from '../detalle-pedido/detalle-pedido.component';

@Component({
  selector: 'app-pedido-main',
  standalone: true,
  imports: [CommonModule,NavbarComponent,TablaContainerComponent,AltaPedidoComponent,DetallePedidoComponent],
  templateUrl: './pedido-main.component.html',
  styleUrl: './pedido-main.component.css'
})
export class PedidoMainComponent {

  containerRecibido: any =  {
    codigo : 0,  
    empresa : '',
    cantidad : 100};

  tomarContainerActivo(event: any) {
    console.log(event);
    this.containerRecibido = event;
  }
}
