import { Account } from "./account";
import { Task } from "./task";

export interface Category {
    id: string;
    name: string;
    deleted: boolean;
    created_at: Date;
    tasks?: Task[];
    userId: string;
    user: Account;
}