import { Account } from "@prisma/client";

export interface CreateProjectDTO {
    name: string;
    icon: string;
    requestingUser: Account;
}