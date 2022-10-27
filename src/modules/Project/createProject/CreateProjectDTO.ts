import { RequestingUser } from "../../../middlewares/auth";

export interface CreateProjectDTO {
    name: string;
    icon: string;
    requestingUser: RequestingUser;
}