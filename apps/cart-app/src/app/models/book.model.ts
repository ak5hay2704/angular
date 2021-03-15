export interface Book {
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
}

export interface VolumeInfo {
  title: string;
  subtitle?: string;
  authors: Array<string>;
  publisher?: string;
  description?: string;
  averageRating?: number;
  imageLinks?: ImageLinks;
}

export interface ImageLinks {
  smallThumbnail?: string;
  thumbnail?: string;
}

export interface UserDetails{
    fName: string,
    email:string,
    number: string,
    address: string
}