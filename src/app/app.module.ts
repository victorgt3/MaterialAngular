import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './shared/template/template.component';
import { MainPrincipalComponent } from './shared/main-principal/main-principal.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule} from '@angular/material';
import { RouterModule } from '@angular/router';
import { rootRouterConfing } from './app.routes';
import { CadPessoaComponent } from './pessoas/cad-pessoa/cad-pessoa.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PessoaService } from './pessoas/pessoa-service';
import { ListaPessoaComponent } from './pessoas/lista-pessoa/lista-pessoa.component';
import { EditarPessoaComponent } from './pessoas/editar-pessoa/editar-pessoa.component';


@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    MainPrincipalComponent,
    CadPessoaComponent,
    ListaPessoaComponent,
    EditarPessoaComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule, 
    HttpClientModule,
    MatTableModule,
    HttpModule,
    AppRoutingModule,
    RouterModule.forRoot(rootRouterConfing, { useHash: false })
  ],
  providers: [
    PessoaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
