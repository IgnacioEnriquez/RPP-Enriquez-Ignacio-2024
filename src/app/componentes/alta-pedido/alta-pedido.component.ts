import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EntidadesService } from '../../services/entidades.service';

@Component({
  selector: 'app-alta-pedido',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './alta-pedido.component.html',
  styleUrl: './alta-pedido.component.css',
})
export class AltaPedidoComponent implements OnChanges {
  @Input() containerCodigo?: any = {
    codigo: 0,
    empresa: '',
    cantidad: 100,
  };

  nuevoPedido: any = {};

  //@ts-ignore
  forma: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private entidadesService: EntidadesService
  ) {}

  ngOnInit() {
    this.forma = this.formBuilder.group({
      codigoContainer: ['', Validators.required],
      codigoProducto: ['', Validators.required],
      cantidadProducto: ['', Validators.required],
    });

    console.log(this.forma);

    this.forma.get('codigoContainer')!.patchValue(this.containerCodigo.codigo);

    this.forma.get('codigoContainer')!.disable();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.forma.get('codigoContainer')!.patchValue(this.containerCodigo.codigo);
  }

  agregarPedido() {
    if (!this.forma.invalid) {
      let productoEncontrado: boolean = false;
      let stockValidado: boolean = false;
      let capacidadValidada: boolean = false;
      let containerViejo : any;

      this.entidadesService.traerProductos().then((productos) => {
        productos.forEach((producto: any) => {
          if (producto.codigo == this.forma.getRawValue().codigoProducto) {
            productoEncontrado = true;
            if (producto.stock >= this.forma.getRawValue().cantidadProducto) {
              stockValidado = true;

              this.entidadesService.traerContainers().then((containers) => {
                containers.forEach((container: any) => {
                  if (
                    container.codigo == this.forma.getRawValue().codigoContainer
                  ) {
                    if (
                      container.capacidad >=
                      this.forma.getRawValue().cantidadProducto
                    ) {
                      capacidadValidada = true;
                      containerViejo = container;
                    }
                  }
                });

                if (productoEncontrado && stockValidado && capacidadValidada) {
                  this.nuevoPedido!.codigoContainer =
                    this.forma.getRawValue().codigoContainer;
                  this.nuevoPedido!.codigoProducto =
                    this.forma.getRawValue().codigoProducto;
                  this.nuevoPedido!.cantidadProducto =
                    this.forma.getRawValue().cantidadProducto;
                  this.entidadesService.agregarPedido(this.nuevoPedido).then(()=>
                  {
                    containerViejo.capacidad  = containerViejo.capacidad - this.forma.getRawValue().cantidadProducto;

                    this.entidadesService.actualizarContainer(containerViejo,containerViejo.uid)
                    
                    this.containerCodigo = {
                      codigo: 0,
                      empresa: '',
                      capacidad: 100,
                    };
                    this.forma.reset();               
                    console.log('MODIFICADO CON EXITO');
                  });


                } else {
                  console.log('ERORR AL CREAR PEDIDO');
                }
              });
            }
          }
        });
      });
    } else {
      console.log('FORM INVALIDO');
    }
  }
}
