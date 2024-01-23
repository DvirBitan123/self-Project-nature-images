
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

export interface CategoryInterface {
  id: string;
  name: string;
}

export interface UserCategoryInput {
  token: string,
  categoryId: string
};

export interface UserImageInput {
  token: string,
  imageId: string
};

export interface UserOutput {
  image_id?: string
  url? : string
  alt?: string
  category?: string
}

export interface UserImgIdOutput {
  image_id: string
};

export interface UserCategoriesOutput {
  category: string
};


