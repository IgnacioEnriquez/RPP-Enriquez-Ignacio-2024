import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { EntidadesService } from '../../services/entidades.service';

@Component({
  selector: 'app-detalle-pedido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-pedido.component.html',
  styleUrl: './detalle-pedido.component.css'
})
export class DetallePedidoComponent implements OnChanges {

  @Input() containerSeleccionado?: any = {
    codigo : 0,  
    empresa : '',
    capacidad : 100};

   pedidosAsociados : any[] = []; 

 
    constructor(private entidadesService : EntidadesService) {
     
      
    }

    ngOnChanges()
    {
      this.pedidosAsociados = []; 
      this.entidadesService.traerPedidos().then((pedidos)=>
      {
        pedidos.forEach((pedido : any) => {

          if(pedido.codigo.container = this.containerSeleccionado.codigo)
          {
            this.pedidosAsociados.push(pedido);
          }          
        });

        
      })

    }

}
