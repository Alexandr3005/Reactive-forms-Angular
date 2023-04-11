import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {


  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array([
      ['Metal Gear'],
      ['Dead Stranding'],
    ], Validators.required )

  })

  nuevoFavorito: FormControl = this.fb.control('', [Validators.required])


  constructor(private fb: FormBuilder) { }

  guardar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;  //Si es invalido no retorna nada 
    }

  
  }
  get favoritosArr(){
    return this.miFormulario.get('favoritos') as FormArray;     // get - Propiedades del array 
  }


  campoNoValido(campo : string){
     this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
     
  }
// Añadir un nuevo campo al formulario 

  agregarFavorito(){
    if(this.nuevoFavorito.invalid){
      return;

    }
    this.favoritosArr.push( new FormControl(this.nuevoFavorito.value, Validators.required));   //Agregar form
    this.nuevoFavorito.reset();
  }

  borrar(i: number){
    this.favoritosArr.removeAt(i)
  }

  
}
