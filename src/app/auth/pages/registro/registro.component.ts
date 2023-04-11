import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
import { ValidatorService } from 'src/app/shared/validator/service/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  usernamePattern: string = '[a-z]{1,15}';


  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.nombreApellidoPattern)]],
    email: ['test1@test.com', [Validators.required, Validators.pattern(this.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, Validators.pattern(this.usernamePattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  
  }, {
    validator: [this.validatorService.camposIguales('password', 'password2')]  //Validar dos contraeñas iguales

  })

  get emailErrorMsg(): string {
      const errors = this.miFormulario.get('email')?.errors;

      if (errors?.['required']){
        return 'Email es obligatorio'
      } else if(errors?.['pattern']){
        return 'El formato del correo no es valido'
      } else if(errors?.['emailTomado']) {
        return 'El correo ya esta registrado'
      }
    
      return '';

  }
  constructor(private fb: FormBuilder, private validatorService: ValidatorService, private emailValidator: EmailValidatorService){ }


  campoNoValido(campo: string){
    return this.miFormulario.get(campo)?.errors && (this.miFormulario.get(campo)?.touched || this.miFormulario.get(campo)?.dirty)
  }

 


  submitFormulario(){
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();

  }


}
