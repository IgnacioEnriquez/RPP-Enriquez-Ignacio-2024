import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Container } from '../../clases/container';
import { EntidadesService } from '../../services/entidades.service';
import { CommonModule } from '@angular/common';
import { collection, doc, Firestore, onSnapshot, query } from '@angular/fire/firestore';

@Component({
  selector: 'app-tabla-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-container.component.html',
  styleUrl: './tabla-container.component.css'
})
export class TablaContainerComponent {
  private _firestore = inject(Firestore);

  @Output() PasamosUnContainer: EventEmitter<any> = new EventEmitter<any>();

  listadoContainers: any[] = [];

  constructor(private entidadesService: EntidadesService) {}

  ngOnInit(): void {
   
  const q = query(collection(this._firestore, "containers"));

const unsubscribe = onSnapshot(q, (querySnapshot) => {
  
  this.listadoContainers = [];

  querySnapshot.forEach((doc) => {
      this.listadoContainers.push(doc.data());
  }); 
});

  }

  enviarContainer(event:any){
    this.PasamosUnContainer.emit(event);
  }

}
