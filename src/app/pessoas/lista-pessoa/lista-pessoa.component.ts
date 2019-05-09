import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../pessoa';
import { PessoaService } from '../pessoa-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lista-pessoa',
  templateUrl: './lista-pessoa.component.html',
  styleUrls: ['./lista-pessoa.component.css']
})
export class ListaPessoaComponent implements OnInit {
  displayedColumns = ['nome', 'email', 'telefone', 'cidade', 'acao'];
  public pessoas: Pessoa[];
  public errorMessage: string = "";
  public errors: any[] = [];

  constructor(private pessoaService: PessoaService,private router: Router) { }

  ngOnInit() {
    this.pessoaService.obterTodos()
      .subscribe(
        pessoas => this.pessoas = pessoas,
        error => this.errorMessage
      );
  }
  
  removerPessoa(id: string){
    this.pessoaService.excluirPessoa(id)
      .subscribe(
        result => {this.onSaveComplete(result)},
        error => {
          this.errors = error.errors;
        }
      );
  }

  onSaveComplete(response: any): void{
    
    this.errors = [];

    this.router.navigate(['/home']);
  }
}
