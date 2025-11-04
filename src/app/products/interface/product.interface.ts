
export interface ProductsResponse {
  data: Data[];
 meta: Meta;
}

export interface OneProductsResponse {
  data: Data;
 meta: Meta;
}

export interface Data {
  type: string;
  id?: number;
  attributes: Product;
}

export interface Product {
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productCategory: Category;
  productImages: any[];
}

export enum Category {
  HEALTH_BEAUTY = "salud y belleza",
  FASHION_ACCESSORIES = "moda y accesorios",
  ELECTRONICS_TECHNOLOGY = "electricos y tecnologia",
  HOME_DECORATION = "casa y decoracion",
  TOYS_BAY = "juguetes y niños",
  SPORTS = "deportes"
}

export interface ProductsResponseError{
  data? : Data,
  errors? : JsonApiError
}

export interface JsonApiError {
  status: string;
  title: string;
  detail: string;
}

export interface Meta {
  size:  number;
  page:  number;
  total_elements: number;
  total_pages: number;

}


