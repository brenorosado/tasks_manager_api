export type Account = {
    id: string;
    email: string;
    name: string;
    password?: string;
    verifiedEmail: boolean;
    deleted: boolean;
    createdAt?: Date;
}