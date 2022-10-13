export interface Releases {
  artists:                string[];
  external_urls:          string;
  id:                     number;
  images:                 Image[];
  name:                   string;
  release_date:           Date;
}

export interface Image {
  height: number;
  url:    string;
  width:  number;
}

