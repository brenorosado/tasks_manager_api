import { Category } from "./category";

export type Account = {
    id: string;
    email: string;
    name: string;
    password?: string;
    verifiedEmail: boolean;
    deleted: boolean;
    created_at?: Date;
    categories?: Category[]
}