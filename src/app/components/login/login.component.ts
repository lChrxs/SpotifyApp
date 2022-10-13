import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';
import StorageHelper from 'src/app/libs/helpers/storage.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public login!: boolean
  public loginForm!: FormGroup

  constructor(
    private authS: AuthService,
    private spotifyS: SpotifyService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit(){

    this.authS.login(this.loginForm.value).subscribe({
      next: (res => {
        
        this.login = res
        
        if(this.login == true){
          this.spotifyS.getToken().subscribe({
            next: (res => {
              StorageHelper.setItem('token', res.access_token)
            }),
            complete: () => {
              this.router.navigate(['/home'])

            }
          })
        }
        
      })
    })
    
  }

}
