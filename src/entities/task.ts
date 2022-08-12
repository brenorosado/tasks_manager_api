import { Category } from "./category";

export interface Task {
    id: string;
    title: string;
    description?: string;
    concluded: boolean;
    deadline: Date;
    deleted: boolean;
    created_at: Date;
    category_id: string;
    category: Category
}