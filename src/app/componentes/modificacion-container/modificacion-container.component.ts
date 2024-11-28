import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Container } from '../../clases/container';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EntidadesService } from '../../services/entidades.service';

@Component({
  selector: 'app-modificacion-container',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './modificacion-container.component.html',
  styleUrl: './modificacion-container.component.css'
})
export class ModificacionContainerComponent implements OnChanges {

  @Input() containerAModificar?: any = {
    codigo : 0,  
    empresa : '',
    capacidad : 100};

  //@ts-ignore
  forma: FormGroup;

  constructor(private formBuilder: FormBuilder, private entidadesService : EntidadesService) { }

  ngOnInit(): void {
    this.forma = this.formBuilder.group({
      codigo: ['', [Validators.required, Validators.min(100)]],  
      empresa: ['', Validators.required],
      capacidad: ['', [Validators.required,Validators.min(0)]],
    });
    this.forma.patchValue(this.containerAModificar);
    this.forma.get('codigo').disable()
  }

  ngOnChanges(changes : SimpleChanges)
  {
    this.forma.patchValue(this.containerAModificar);
  }

  agregarContainer() {
    console.log(this.containerAModificar);
    if (!this.forma.invalid && this.containerAModificar.uid) {
      this.containerAModificar!.codigo = this.forma.getRawValue().codigo;
            this.containerAModificar!.empresa = this.forma.getRawValue().empresa;
      this.containerAModificar!.capacidad = this.forma.getRawValue().capacidad;
      this.entidadesService.actualizarContainer(this.containerAModificar,this.containerAModificar.uid);
      this.containerAModificar =  {
        codigo : 0,  
        empresa : '',
        capacidad : 100};
      this.forma.reset();
      this.forma.patchValue(this.containerAModificar,this.containerAModificar.uid);
      console.log('MODIFICADO CON EXITO');
    } else {
      console.log('FORM INVALIDO');
    }
  }


}
