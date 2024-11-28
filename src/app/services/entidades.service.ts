import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Producto } from '../clases/producto';
import { Container } from '../clases/container';

@Injectable({
  providedIn: 'root',
})
export class EntidadesService {
  private _firestore = inject(Firestore);

  async traerProductos() {
    let productosList: any = [];

    const chatsRef = collection(this._firestore, 'productos');

    const q = query(chatsRef);

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc: any) => {
      productosList.push(doc.data());
    });

    console.log();
    return productosList;
  }

  async crearProducto(producto: Producto) {
    const prod = {
      codigo: producto.codigo,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      paisOrigen: producto.paisOrigen,
    };

    const querySnapshot = await getDocs(
      collection(this._firestore, 'productos')
    );

    const productos = doc(collection(this._firestore, 'productos'));

    await setDoc(productos, prod);
  }

  async traerContainers() {
    let containersList: any = [];

    const containers = collection(this._firestore, 'containers');

    const q = query(containers);

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc: any) => {
      containersList.push(doc.data());
    });

    return containersList;
  }

  async crearContainer(container: any) {
    
    
    const cont = {
      codigo: container.codigo,      
      empresa: container.empresa,
      capacidad: container.capacidad,
    };
    
    const querySnapshot = await addDoc(
      collection(this._firestore, 'containers'),
      cont
    );   

    const cont2 = 
    {
      codigo: container.codigo,      
      empresa: container.empresa,
      capacidad: container.capacidad,
      uid: querySnapshot.id     
    }

    await setDoc(querySnapshot, cont2).then(()=>
    {
      console.log("SET DOC CORRECTAMENTE");
    });
  }

  async actualizarContainer(container : any, uid : any)
  {
    const cont = {
      codigo: container.codigo,    
      empresa: container.empresa,
      capacidad: container.capacidad,
    };

    console.log(uid);
    const ref = doc(this._firestore, 'containers', uid);


    await updateDoc(ref, cont);

  }

  async deleteContainer(uid : any)
  {
    console.log(uid);
    await deleteDoc(doc(this._firestore, "containers", uid)).then(()=>
    {
      console.log("Documento Eliminado")
    });       


  }
}
