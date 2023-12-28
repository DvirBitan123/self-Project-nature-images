
export interface ImageInterface {
  id: string;
  url: string;
  alt: string;
  description: string;
  category: string;
  equipment: string;
  imageDate: string;
  location: string;
  lng: number;
  lat: number;
}

export interface CategoryInterface {
  id: string;
  name: string;
}