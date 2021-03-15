import { Address } from '../book/address';
export interface Book {
  id: string;
  title: string;
  description: string;
  authors: string[];
  publisher: string;
  imageLink: string;
  price: number;
  currency: string;
  deliveryAddress?: Address;
}
