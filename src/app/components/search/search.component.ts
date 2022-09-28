import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  artistas: any[]= []

  constructor(public spotifyS: SpotifyService) { }

  ngOnInit(): void {
  }

  findArtist(value: string){
    this.spotifyS.getArtistas(value).subscribe({
      next: (res: any) => {
        this.artistas = res
        console.log(this.artistas)
      },
      error: (err) => {
        console.error(err)
      },
      complete: () => console.info('Peticion completa')
    })
  }

}
