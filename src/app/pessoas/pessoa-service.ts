import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from './pessoa';
import { catchError} from 'rxjs/operators';
import { ServiceBase } from '../shared/service-base';

@Injectable()
export class PessoaService extends ServiceBase{
    constructor(private http: HttpClient){ super();   }

    // Registrar pessoas 
    registrarPessoa(pessoa: Pessoa): Observable<Pessoa>{
        return this.http.post<Pessoa>(this.UrlServiceV1 + "nova-pessoa", pessoa, super.obterHttpOptions())
        .pipe(catchError(super.serviceError));
    }

    // Listar pessoas
    obterTodos(): Observable<Pessoa[]>{
        return this.http.get<Pessoa[]>(this.UrlServiceV1 + "pessoas")
            .pipe(catchError(super.serviceError));
    }
    
    
    // Pessoa por id
    obterPessoa(id: string): Observable<Pessoa>{
        return this.http.get<Pessoa>(this.UrlServiceV1 + "/pessoa/" + id)
            .pipe(catchError(super.serviceError));
    }

    // Atualizar Pessoa
    atualizarPessoa(pessoa: Pessoa): Observable<Pessoa>{
        return this.http.put<Pessoa>(this.UrlServiceV1 + "pessoa", pessoa, super.obterHttpOptions())
            .pipe(catchError(super.serviceError));
    }

    // Excluir Pessoa
    excluirPessoa(id: string): Observable<Pessoa>{
        return this.http.delete<Pessoa>(this.UrlServiceV1 + "/pessoa/" + id)
            .pipe(catchError(super.serviceError));
    }
}