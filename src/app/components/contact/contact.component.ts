import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public contactForm!: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      nombre: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      subject: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      message: new FormControl(null, [Validators.required, Validators.maxLength(200)])
    })
    this.contactForm.get('nombre')?.setErrors({
      minLength: true
    })
  }
  
  onSubmit(){
    console.log('Success')
    console.log(this.contactForm.value)
    
  }

}
