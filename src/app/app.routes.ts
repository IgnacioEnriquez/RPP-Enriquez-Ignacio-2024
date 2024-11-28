import { Routes } from '@angular/router';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { LoginComponent } from './componentes/login/login.component';
import { AltaProductoComponent } from './componentes/alta-producto/alta-producto.component';
import { ListadoProductosComponent } from './componentes/listado-productos/listado-productos.component';
import { ContainerMainComponent } from './componentes/container-main/container-main.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'alta-producto', component: AltaProductoComponent },
  { path: 'listado-producto',component: ListadoProductosComponent},
  { path: 'container',component: ContainerMainComponent},
  { path: '', component: BienvenidaComponent },
];
