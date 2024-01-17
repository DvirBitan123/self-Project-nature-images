import { Feature } from "ol";
import { Point } from "ol/geom";

export interface ImageInterface {
  id: string;
  url: string;
  alt: string;
  description: string;
  category: string;
  equipment: string;
  date: string;
  location: string;
  lng: number;
  lat: number;
}

export interface FeatureParam {
  feature: Feature<Point>;
  ImgUrl: string;
  imgAlt: string;
  imgLocation: string;
  imgId: string;
}

export interface UserFuncsOutput {
  image_id?: string
  url? : string
  alt?: string
  category?: string
}
