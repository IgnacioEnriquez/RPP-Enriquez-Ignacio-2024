import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiPaisesService } from '../../services/api-paises.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listado-paises',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './listado-paises.component.html',
  styleUrl: './listado-paises.component.css'
})
export class ListadoPaisesComponent {
  @Output() PasamosUnPais: EventEmitter<any> = new EventEmitter<any>();

  listadoPaises: any;
  listadoPaisesEuropa: any;
  listadoReducido: any[] = [];

  constructor(private apiPaises: ApiPaisesService) {}

  ngOnInit(): void {
    this.traerPaises();
  }

  async traerPaises() {
    this.listadoPaises = await this.apiPaises.traerPaises();
    this.listadoPaisesEuropa = this.listadoPaises
      .filter((p: any) => {
        return p.continents[0] == 'Europe';
      })
      .sort(() => Math.random() - 0.5);
    for (let i = 0; i < 5; i++) {
      const pais = this.listadoPaisesEuropa[i];
      this.listadoReducido.push(pais);
    }
  }

  pasarPais(pais: any) {
    this.PasamosUnPais.emit(pais);
  }

}
