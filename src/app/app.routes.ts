import { Routes } from '@angular/router';
import { TemplateComponent } from './shared/template/template.component';
import { CadPessoaComponent } from './pessoas/cad-pessoa/cad-pessoa.component';
import { ListaPessoaComponent } from './pessoas/lista-pessoa/lista-pessoa.component';
import { EditarPessoaComponent } from './pessoas/editar-pessoa/editar-pessoa.component';

export const rootRouterConfing: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: TemplateComponent },
    { path: 'cad-pessoa', component: CadPessoaComponent },
    { path: 'lista-pessoa', component: ListaPessoaComponent},
    { path: 'editar/:id', component: EditarPessoaComponent}
]