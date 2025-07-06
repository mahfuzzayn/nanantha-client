export interface IProduct {
    _id: string;
    title: string;
    author: string;
    price: number;
    image: string;
    category: string;
    rating: number;
    description: string;
    quantity: number;
    inStock: string | boolean;
}
