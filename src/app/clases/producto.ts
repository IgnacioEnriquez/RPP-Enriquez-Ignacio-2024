export class Producto {
    codigo: number;
  descripcion: string;
  precio: number;
  stock: number;
  paisOrigen: any;  
  constructor(
    codigo: number,
    descripcion: string,
    precio: number,
    stock: number,
    paisOrigen: any,

  ) {
    this.codigo = codigo;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock;
    this.paisOrigen = paisOrigen;
   
  }
}
