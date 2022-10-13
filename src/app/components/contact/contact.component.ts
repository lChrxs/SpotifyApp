import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import StorageHelper from '../../libs/helpers/storage.helper';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public contactForm!: FormGroup

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      nombre: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      subject: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      message: new FormControl(null, [Validators.required, Validators.maxLength(200)])
    })
  }
  
  onSubmit(){
    console.log('Success')
    console.log(this.contactForm.value)
    
  }

  saveForm(){
    StorageHelper.setItem('contact', JSON.stringify(this.contactForm.value))
    this.router.navigate(['/home'])
  }


}
