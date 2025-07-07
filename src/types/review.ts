import { IProduct } from "./product";
import { IUser } from "./user";

export interface IReview {
    _id: string;
    product: IProduct;
    user: IUser;
    isVisible: boolean;
    rating: number;
    comment: string;
}
