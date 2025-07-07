import { IReview } from "./review";

export interface IProduct {
    _id: string;
    title: string;
    author: string;
    price: number;
    image: string;
    category: string;
    rating: number;
    description: string;
    reviews: IReview[];
    quantity: number;
    inStock: string | boolean;
}

export interface IAuthor {
    name: string;
    books: string[];
}
