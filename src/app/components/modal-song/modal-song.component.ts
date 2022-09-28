import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpotifyService } from '../../services/spotify.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-modal-song',
  templateUrl: './modal-song.component.html',
  styleUrls: ['./modal-song.component.scss']
})
export class ModalSongComponent implements OnInit {

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild('prevSong') prevSong?: ElementRef

  displayedColumns: string[] = ['track_number', 'name', 'duration_ms', 'preview_url'];
  dataSource!: MatTableDataSource<any>;
  album: any
  error: string = ''

  constructor(
    public dialogRef: MatDialogRef<ModalSongComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public spotifyS: SpotifyService
  ) { }

  ngOnInit(): void {

    this.spotifyS.getAlbum(this.data).subscribe({
      next: (res) => {
        console.log(res)
        this.album = res;
        this.dataSource = new MatTableDataSource(this.album.tracks.items);
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error: ' + err
      },
      complete: () => console.info('Peticion completa')
    })
  }

  closeForm(){
    this.dialogRef.close();
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
