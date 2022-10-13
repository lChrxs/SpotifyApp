import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Observable, tap } from 'rxjs';
import { Artists } from 'src/app/libs/interfaces/artists.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  artistas$!: Observable<Artists[]>
  audio = new Audio()

  constructor(public spotifyS: SpotifyService) { }

  ngOnInit(): void {
  }

  findArtist(value: string){
    if(value.length > 0){

      this.artistas$ = this.spotifyS.getArtistas(value)
    }
  }

  playSong(song: any){
    
    this.audio.src = song
    this.audio.load()
    this.audio.play()
  }

  stopSong(){
    this.audio.pause()
  }

}
