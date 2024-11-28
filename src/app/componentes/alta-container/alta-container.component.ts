import { Component, EventEmitter, Output } from '@angular/core';
import { Container } from '../../clases/container';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EntidadesService } from '../../services/entidades.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alta-container',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './alta-container.component.html',
  styleUrl: './alta-container.component.css'
})
export class AltaContainerComponent {

  @Output() PasamosUnContainer: EventEmitter<any> = new EventEmitter<any>();
  listadoContainers: any[] = [];
  nuevoContainer: any =  {
    codigo : 0,  
    empresa : '',
    cantidad : 100};

  //@ts-ignore
  forma: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private entidadesService: EntidadesService
  ) {}

  ngOnInit(): void {
    this.forma = this.formBuilder.group({
      codigo: ['', [Validators.required, Validators.min(100)]],  
      empresa: ['', Validators.required],
      capacidad: ['', [Validators.required,Validators.min(0)]],
    });
  /*   this.entidadesService.traerContainers().subscribe((containers) => {
      if (containers != null) {
        this.listadoContainers = containers;
      }
    }); */
  }

  agregarContainer() {
    if (!this.forma.invalid) {
      this.nuevoContainer.codigo = this.forma.getRawValue().codigo;   
      this.nuevoContainer.empresa = this.forma.getRawValue().empresa;
      this.nuevoContainer.capacidad = this.forma.getRawValue().capacidad;
      this.entidadesService.crearContainer(this.nuevoContainer);
      this.PasamosUnContainer.emit(this.nuevoContainer);
      this.nuevoContainer =  {
        codigo : 0,  
        empresa : '',
        cantidad : 100};
      this.forma.reset();
      console.log('AGREGADO CON EXITO');
    } else {
      console.log('FORM INVALIDO');
    }
  }

}
