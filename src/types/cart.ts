export interface ICartItem {
    _id: string;
    productId: string;
    title: string;
    author: string;
    image: string;
    price: number;
    quantity: number;
    totalPrice: number;
}

export interface ICart {
    _id: string;
    userId: string;
    items: ICartItem[];
    totalItems: number;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
