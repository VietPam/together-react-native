import { Member } from "./Member";

export interface Room {
    roomName: string;
    description: string;
    room: Member[];
}
