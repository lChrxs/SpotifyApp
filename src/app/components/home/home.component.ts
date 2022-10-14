import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SpotifyService } from '../../services/spotify.service';
import { ModalSongComponent } from '../modal-song/modal-song.component';
import { concatMap, Observable, tap, concat, merge, reduce, mergeMap } from 'rxjs';
import { Releases } from '../../libs/interfaces/releases.interface';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // releases$!: Observable<any>
  // nextReleases$!: Observable<any>
  originalReleases: Releases[] = []
  albumsLoaded: number = 0

  constructor(
    public spotifyS: SpotifyService,
    public dialog: MatDialog  
  ) { }

  ngOnInit(): void {

    this.getNewReleases()
  }

  getNewReleases(){
    this.spotifyS.getNewReleases(this.albumsLoaded).subscribe({
      next: (res => {

        if(this.originalReleases.length > 0){
          res.forEach((element: any) => {
            this.originalReleases.push(element)
          });

        }else {
          this.originalReleases = res
          
        }
      })
    })
  }

  openModal(id: number){
    const modalConfig = new MatDialogConfig()
    modalConfig.width = '80vw'
    modalConfig.height = '70vh'
    modalConfig.data = id
    modalConfig.hasBackdrop = true
    modalConfig.panelClass = 'modalBg'
    this.dialog.open(ModalSongComponent, modalConfig)
  }

  onScroll(e: any){
    if (e.target.offsetHeight + e.target.scrollTop >= (e.target.scrollHeight - 700)){
      if(this.albumsLoaded < 75){

        this.albumsLoaded += 25
        this.getNewReleases()

        // ?Puede ser con BehaviorSubject

        // this.nextReleases$ = this.spotifyS.getNewReleases(this.albumsLoaded)

        // // Funciona pero no es lo que quiero hacer
        // this.releases$ = merge(this.releases$, this.nextReleases$).pipe(
        //   reduce((a, b) => a.concat(b)),
        //   tap(console.log)
        // )
      }
      
    }
  }

  toggleLiked(id: number){
    if(this.spotifyS.checkLikedRelease(id)){
      this.spotifyS.removeLikedRelease(id)
    }else {
      this.spotifyS.addLikedRelease(id)
    }
  }

}
