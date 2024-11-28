export class Container {
    codigo: number;  
    empresa: string;
    capacidad: number;
    constructor(
      codigo: number,  
      empresa: string,
      capacidad: number
    ) {
      this.codigo = codigo;     
      this.empresa = empresa;
      this.capacidad = capacidad;
    }
  }