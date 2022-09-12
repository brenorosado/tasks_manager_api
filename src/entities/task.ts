import { Category } from "./category";

export interface Task {
    id: string;
    title: string;
    description?: string;
    concluded: boolean;
    deadline: Date;
    deleted: boolean;
    createdAt: Date;
    categoryId: string;
    category: Category
}