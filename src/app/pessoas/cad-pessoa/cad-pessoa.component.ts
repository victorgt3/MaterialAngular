import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { FormControlName, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { Pessoa } from '../pessoa';
import { GenericValidartor } from 'src/app/utils/generic-form-validator';
import { fromEvent, Observable, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PessoaService } from '../pessoa-service';


@Component({
  selector: 'app-cad-pessoa',
  templateUrl: './cad-pessoa.component.html',
  styleUrls: ['./cad-pessoa.component.css']
})
export class CadPessoaComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public errors: any[] = [];
  public pessoaForm: FormGroup;
  public pessoa: Pessoa;

  constructor(private fb: FormBuilder,
              private router: Router,
              private pessoaService: PessoaService) {
    this.validationMessages = {
      nome: {
        required: 'O Nome é requerido.',
        minlength: 'O Nome presisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres'
      },
      email: {
        required: 'Informe o e-mail',
        email: 'Email invalido'
      },
      telefone: {
        required: 'O Telefone é requerido.',
        minlength: 'O telefone presisa ter no mínimo 8 caracteres',
        maxlength: 'O telefone precisa ter no máximo 9 caracteres'
      },
      cidade: {
        required: 'A cidade é requerido.',
        minlength: 'A cidade presisa ter no mínimo 2 caracteres',
        maxlength: 'A cidade precisa ter no máximo 150 caracteres'
      }
    };

    this.genericValidator = new GenericValidartor(this.validationMessages);
    this.pessoa = new Pessoa();
  }

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidartor;

  ngOnInit() {
    this.pessoaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      email: ['', [Validators.required, CustomValidators.email]],
      telefone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      cidade: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]]
    })
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((FormControl: ElementRef) => fromEvent(FormControl.nativeElement, 'blur'));

    merge(this.pessoaForm.valueChanges, ...controlBlurs).pipe(debounceTime(100)).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.pessoaForm);
    });
  }

  adicionarPessoa(){
    if(this.pessoaForm.dirty && this.pessoaForm){
      let p = Object.assign({}, this.pessoa, this.pessoaForm.value);

      this.pessoaService.registrarPessoa(p)
        .subscribe(
          result => {this.onSaveComplete(result)},
          error => {
            this.errors = error.errors;
          }
        );
    }
  }


  onSaveComplete(response: any): void{
    this.pessoaForm.reset();
    this.errors = [];

    this.router.navigateByUrl('/home');
  }

  ngOnDestroy(): void{
    //throw new Error('Methos not implemented.');
  }
}
