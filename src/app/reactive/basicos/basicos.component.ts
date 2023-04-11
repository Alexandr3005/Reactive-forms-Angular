import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit  {


  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)], ], 
    precio: ['', [Validators.required, Validators.min(0)]],
    existencias: ['', [Validators.required, Validators.min(0)]],
                                                             
  })
 

  constructor( private fb: FormBuilder) { }
  ngOnInit(): void {   //
      this.miFormulario.reset({ 
        nombre: 'RTX 4080',
        precio: 1600,
        existencias: 10
      })
  }

  campoNoValido(campo : string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  guardar() {

    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;  //Si es invalido no retorna nada 
    }


    console.log(this.miFormulario.value);
  }

  
}
