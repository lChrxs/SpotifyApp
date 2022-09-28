import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public auth: boolean = false;
  public user: string = 'Chris111';
  public password: string = '123456';

  constructor(public router: Router) { }

  login(user: string, password: string){
    if(this.user === user && this.password === password){
      this.auth = true;
      sessionStorage.setItem('auth', this.auth.toString())
      console.log('Simon')
      this.router.navigate(['home'])
    }else {
      window.location.reload()
      console.log('Nel')
    }
   
  }
}
