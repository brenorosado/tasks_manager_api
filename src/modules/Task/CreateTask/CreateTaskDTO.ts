export interface CreateTaskDTO {
    title: string;
    description?: string;
    deadline?: Date;
    categoryId: string;
}