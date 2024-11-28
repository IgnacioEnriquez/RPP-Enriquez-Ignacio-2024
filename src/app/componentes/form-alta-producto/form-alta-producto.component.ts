import { Component, Input } from '@angular/core';
import { Producto } from '../../clases/producto';
import { FormBuilder, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { EntidadesService } from '../../services/entidades.service';
import { onSnapshot } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-alta-producto',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './form-alta-producto.component.html',
  styleUrl: './form-alta-producto.component.css'
})
export class FormAltaProductoComponent {
  @Input() paisForm?: any;

  listadoProductos: any[] = [];
  nuevoProducto: Producto = new Producto(0, '', 0, 0, {});
  //@ts-ignore
  forma: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private entidadesService: EntidadesService
  ) {}

  ngOnInit(): void {
    this.forma = this.formBuilder.group({
      codigo: ['', [Validators.required, Validators.min(100)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      precio: ['', [Validators.required,Validators.min(0)]],
      stock: ['', Validators.required],
      paisOrigen: ['', Validators.required],
    });
    this.entidadesService.traerProductos().then((listado) => {

      this.listadoProductos = listado;
     
    })    
  }

  agregarProducto() {
    this.forma.setValue({
      codigo: this.forma.getRawValue().codigo,
      descripcion: this.forma.getRawValue().descripcion,
      precio: this.forma.getRawValue().precio,
      stock: this.forma.getRawValue().stock,
      paisOrigen: this.forma.getRawValue().paisOrigen, 
    });

    if (!this.forma.invalid) {
      this.nuevoProducto.codigo = this.forma.getRawValue().codigo;
      this.nuevoProducto.descripcion = this.forma.getRawValue().descripcion;
      this.nuevoProducto.precio = this.forma.getRawValue().precio;
      this.nuevoProducto.stock = this.forma.getRawValue().stock;
      this.nuevoProducto.paisOrigen = this.paisForm;    
      this.entidadesService.crearProducto(this.nuevoProducto);
      this.nuevoProducto = new Producto(0, '', 0, 0, {});
      this.forma.reset();
      this.paisForm = null;
      console.log('AGREGADO CON EXITO');
    } else {
      console.log('FORM INVALIDO');
    }
  }

}
