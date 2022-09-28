import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SpotifyService } from '../../services/spotify.service';
import { ModalSongComponent } from '../modal-song/modal-song.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  releases: any[] = []

  constructor(
    public spotifyS: SpotifyService,
    public dialog: MatDialog  
  ) { }

  ngOnInit(): void {

    this.spotifyS.getNewReleases().subscribe(res => {
      console.log(res)
      this.releases = res
    })

  }

  openModal(id: string){
    const modalConfig = new MatDialogConfig()
    modalConfig.width = '80vw'
    modalConfig.height = '70vh'
    modalConfig.data = id
    modalConfig.hasBackdrop = true
    modalConfig.panelClass = 'modalBg'
    this.dialog.open(ModalSongComponent, modalConfig)
  }

}
