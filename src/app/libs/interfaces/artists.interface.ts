export interface Artists {
  external_urls: string;
  followers:     number;
  images:        Image[];
  name:          string;
  id:            number;
  song?:          Song
}

export interface Image {
  height: number;
  url:    string;
  width:  number;
}

export interface Song {
  album:      string;
  song?:      string
}
