import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewContainerRef } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pessoa } from '../pessoa';
import { Subscription, Observable, fromEvent, merge } from 'rxjs';
import { PessoaService } from '../pessoa-service';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericValidartor } from 'src/app/utils/generic-form-validator';
import { CustomValidators } from 'ng2-validation';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-editar-pessoa',
  templateUrl: './editar-pessoa.component.html',
  styleUrls: ['./editar-pessoa.component.css']
})
export class EditarPessoaComponent implements OnInit, AfterViewInit {
  @ViewChild(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public errors: any[] = [];
  pessoa: Pessoa;
  pessoaForm: FormGroup;
  private sub: Subscription;
  pessoaId: string = "";

  constructor(private fb: FormBuilder,
    private pessoaService: PessoaService,
    private router: Router,
    private route: ActivatedRoute,
    vcr: ViewContainerRef) {
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
    });

    this.sub = this.route.params.subscribe(
      params => {
        this.pessoaId = params['id'];
        this.obterPessoa(this.pessoaId);
      }
    );
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((FormControl: ElementRef) => fromEvent(FormControl.nativeElement, 'blur'));

    merge(this.pessoaForm.valueChanges, ...controlBlurs).pipe(debounceTime(100)).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.pessoaForm);
    });
  }

  obterPessoa(id: string){
    this.pessoaService.obterPessoa(id)
    .subscribe(
      pessoa => this.preencherFormPessoa(pessoa),
      response =>{
        if(response.status == 404){
          console.log('Acesso negado!');
        }
    });
  }

  preencherFormPessoa(pessoa: Pessoa): void{
    this.pessoa = pessoa;

    this.pessoaForm.patchValue({
      nome: this.pessoa.nome,
      email: this.pessoa.email,
      telefone: this.pessoa.telefone,
      cidade: this.pessoa.cidade          
    });

  }

  atualizarPessoa(){
    if(this.pessoaForm.dirty && this.pessoaForm){
      let p = Object.assign({}, this.pessoa, this.pessoaForm.value);
      p.pessoaId = this.pessoaId;

      this.pessoaService.atualizarPessoa(p)
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

    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void{
    //throw new Error('Methos not implemented.');
  }
}
