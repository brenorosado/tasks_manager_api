export interface UpdateTaskDTO {
    id: string;
    title: string;
    description?: string;
    deadline?: Date;
}