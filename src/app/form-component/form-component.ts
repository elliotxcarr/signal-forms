import { Component, signal } from '@angular/core';
import { form, Field, min, disabled, readonly } from '@angular/forms/signals';

interface Address{
  line1: string,
  line2: string
}
@Component({
  selector: 'app-form-component',
  imports: [Field],
  templateUrl: './form-component.html',
  styleUrl: './form-component.css',
})
export class FormComponent {

  personalModel = signal({
    email:'',
    name: '',
    age: 0,
    telephone: '',
    address: {
      line1:'2 Mullholland Drive',
      line2: 'Hollywood'
    } as Address,
    settings: {
      role: 'admin'
    }
  });

  personalForm = form(this.personalModel, (schemaPath) => {
    min(schemaPath.age, 18, {message: 'You must be at least 18 years old'})
    disabled(schemaPath.address.line1, ({valueOf}) => valueOf(schemaPath.age) === 20)
    readonly(schemaPath.address.line2)
  })
}
