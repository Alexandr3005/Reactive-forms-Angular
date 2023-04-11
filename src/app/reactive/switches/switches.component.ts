import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit  {

  

  miFormulario: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    condiciones: [false, Validators.requiredTrue]  //Condiciones tienen que estar confirmadas
  });
  

  persona = {
    genero: 'F',
    notificaicones: true,
    condiciones: false,
    
  }

  ngOnInit(){
    this.miFormulario.reset(this.persona);

    this.miFormulario.valueChanges.subscribe( ({condiciones, ...restoDeArgumentos}) => { // Argumentos que no se actualizan
      this.persona = restoDeArgumentos;   
      console.log(restoDeArgumentos) 
    })
   }
  

  constructor(private fb: FormBuilder) { }

  guardar(){
    const formValue = {
      ...this.miFormulario.value
    }
    console.log(this.miFormulario.value)

    delete formValue.condiciones;
    this.persona = formValue;
  }
 

}
