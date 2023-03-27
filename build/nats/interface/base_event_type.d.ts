import { Subjects } from "./subject";
export interface TicketCreatedInterface {
    subjects: Subjects;
    data: {
        id: string;
        title: string;
        price: number;
        userId: string;
    };
}
