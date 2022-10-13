import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'chris-project';
  showHeader: boolean = true

  constructor(private router: Router){

  }

  ngOnInit(): void {

    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(event => this.getUrl(event));

  }

  private getUrl(location: any){
    this.showHeader = location.url == '/login' ? false : true;
  }
}
