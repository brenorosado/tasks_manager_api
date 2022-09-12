export type Account = {
    id: string;
    email: string;
    name: string;
    password?: string;
    deleted: boolean;
    createdAt?: Date;
}