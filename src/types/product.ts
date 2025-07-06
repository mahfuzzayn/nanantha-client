export interface IProduct {
    _id: string;
    title: string;
    author: string;
    price: number;
    image: string;
    category: string;
    description: string;
    quantity: number;
    inStock: string | boolean;
}
