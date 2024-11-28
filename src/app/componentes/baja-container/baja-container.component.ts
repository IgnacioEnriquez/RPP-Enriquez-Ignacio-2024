import { Component, Input } from '@angular/core';
import { EntidadesService } from '../../services/entidades.service';

@Component({
  selector: 'app-baja-container',
  standalone: true,
  imports: [],
  templateUrl: './baja-container.component.html',
  styleUrl: './baja-container.component.css'
})
export class BajaContainerComponent {
  
  @Input() containerAEliminar?: any = {
    codigo : 0,  
    empresa : '',
    capacidad : 100};

    constructor(private entidadeService : EntidadesService)
    {

    }

    eliminarContainer()
    {
      if(this.containerAEliminar.uid)
      {
        this.entidadeService.deleteContainer(this.containerAEliminar.uid);
      }
      else
      {
        console.log("No se puede eliminar")
      }
      
    }

}
